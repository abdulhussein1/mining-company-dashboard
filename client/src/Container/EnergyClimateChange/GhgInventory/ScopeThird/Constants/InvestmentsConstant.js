const INVESTMENTS = [
  {
    attributes: {
      description: 'No Data Available',
      data_value_validation_id: 'Test',
      active: 1,
    },
    required: true,
    container: 20,
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 28,
      data_key: 'purchased_services',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A8%2C%22data_key%22%3A%22purchased_services%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

];

export default INVESTMENTS;
