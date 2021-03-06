import Vue from 'vue';
import * as types from './mutation_types';
import { convertObjectPropsToCamelCase } from '~/lib/utils/common_utils';

export default {
  [types.SET_PROJECT_ID](state, projectId) {
    state.projectId = projectId;
  },
  [types.SET_SELECTED_MILESTONES](state, selectedMilestones) {
    Vue.set(state, 'selectedMilestones', selectedMilestones);
  },
  [types.ADD_SELECTED_MILESTONE](state, selectedMilestone) {
    state.selectedMilestones.push(selectedMilestone);
  },
  [types.REMOVE_SELECTED_MILESTONE](state, selectedMilestone) {
    const filteredMilestones = state.selectedMilestones.filter(
      milestone => milestone !== selectedMilestone,
    );
    Vue.set(state, 'selectedMilestones', filteredMilestones);
  },
  [types.SET_QUERY](state, query) {
    state.query = query;
  },
  [types.REQUEST_START](state) {
    state.requestCount += 1;
  },
  [types.REQUEST_FINISH](state) {
    state.requestCount -= 1;
  },
  [types.RECEIVE_PROJECT_MILESTONES_SUCCESS](state, response) {
    state.matches.projectMilestones = {
      list: convertObjectPropsToCamelCase(response.data).map(({ title }) => ({ title })),
      totalCount: parseInt(response.headers['x-total'], 10),
      error: null,
    };
  },
  [types.RECEIVE_PROJECT_MILESTONES_ERROR](state, error) {
    state.matches.projectMilestones = {
      list: [],
      totalCount: 0,
      error,
    };
  },
};
