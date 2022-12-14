import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
	name: "bugs",
	initialState: { list: [], loadgin: false, lastFetch: null },
	reducers: {
		bugsRequested: (bugs, action) => {
			bugs.loading = true;
		},
		bugsReceived: (bugs, action) => {
			bugs.list = action.payload;
			bugs.loading = false;
			bugs.lastFetch = Date.now();
		},
		bugsRequestFailed: (bugs, action) => {
			bugs.loading = false;
		},
		bugAssignedToUser: (bugs, action) => {
			const { id: bugId, userId } = action.payload;
			const index = bugs.list.findIndex((bug) => bug.id === bugId);
			bugs.list[index].userId = userId;
		},
		bugAdded: (bugs, action) => {
			bugs.list.push(action.payload);
		},
		bugResolved: (bugs, action) => {
			const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
			bugs.list[index].resolved = true;
		},
	},
});
export const {
	bugAdded,
	bugResolved,
	bugAssignedToUser,
	bugsReceived,
	bugsRequested,
	bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs;

	const diffInMinutes = moment.diff(moment(lastFetch), "minutes");
	if (diffInMinutes < 10) return;

	dispatch(
		apiCallBegan({
			url,
			onStart: bugsRequested.type,
			onSuccess: bugsReceived.type,
			onError: bugsRequestFailed.type,
		}),
	);
};

//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);

export const addBug = (bug) =>
	apiCallBegan({
		url,
		method: "post",
		data: bug,
		onSuccess: bugAdded.type,
	});

export const resolveBug = (id) =>
	apiCallBegan({
		url: url + "/" + id,
		method: "patch",
		data: { resolved: true },
		onSuccess: bugResolved.type,
	});

export const assignBugToUser = (bugId, userId) => {
	apiCallBegan({
		url: url + "/" + bugId,
		method: "patch",
		data: { userId },
		onSuccess: bugAssignedToUser.type,
	});
};

//Selector
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

//Memoization
export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(state) => state.entities.projects,
	(bugs, projects) => bugs.filter((bug) => !bug.resolved),
);

export const getBugByUser = (userId) =>
	createSelector(
		(state) => state.entities.bugs,
		(bugs) => bugs.filter((bug) => bug.userId === userId),
	);
