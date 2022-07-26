const SCOPE_INSIDE_TABS = [
  {
    attributes: {
      description: 'Energy Purchased ',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'energy_purchased',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22energy_purchased%22%7D',
  },
];

export default SCOPE_INSIDE_TABS;
