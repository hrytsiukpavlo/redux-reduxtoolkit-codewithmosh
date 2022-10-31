import configureStore from "./store/configureStore";
// import {
// 	bugAdded,
// 	bugResolved,
// 	getUnresolvedBugs,
// 	bugAssignedToUser,
// 	getBugByUser,
// } from "./store/bugs";
// import { projectAdded } from "./store/projects";
// import { userAdded } from "./store/users";
import * as actions from "./store/api";
import { loadBugs, resolveBug, addBug, assignBugToUser } from "./store/bugs";

const store = configureStore();

// store.subscribe(() => {
//   console.log('Store changed');
// });

// store.dispatch(userAdded({ name: 'User 1' }));
// store.dispatch(userAdded({ name: 'User 2' }));
// store.dispatch(projectAdded({ name: 'Project 1' }));
// store.dispatch(bugAdded({ description: 'Bug 1' }));
// store.dispatch(bugAdded({ description: 'Bug 2' }));
// store.dispatch(bugAdded({ description: 'Bug 3' }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));

// const bugs = getBugByUser(1)(store.getState());
// console.log(bugs);

// const unresolvedBugs = getUnresolvedBugs(store.getState());

// console.log(unresolvedBugs);

// store.dispatch((dispatch, getState) => {
//   dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] });
//   console.log(getState());
// });

// store.dispatch({
//   type: 'error',
//   payload: { message: 'An error occurred' },
// });

// store.dispatch(addBug({ description: "a" }));

// setTimeout(() => store.dispatch(loadBugs()), 2000);

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(resolveBug(1)), 2000);

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);
