const SCOPE_INSIDE_TABS = [
  {
    attributes: {
      description: 'Water Consumption',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 6,
          data_key: 'category_level_20',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_20%22%7D',
      },
    },
    id: {
      material_issue_id: 6,
      data_key: 'category_level_20',
      data_value: 'water_consumption',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_20%22%2C%22data_value%22%3A%22water_consumption%22%7D',
  },
];

export default SCOPE_INSIDE_TABS;
