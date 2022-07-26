const WATER_MANAGEMENT = [
  {
    attributes: {
      description: 'Management Approach',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 6,
          data_key: 'category_level_10',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_10%22%7D',
      },
    },
    id: {
      material_issue_id: 6,
      data_key: 'category_level_10',
      data_value: 'management_approach',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_10%22%2C%22data_value%22%3A%22management_approach%22%7D',
  },
  {
    attributes: {
      description: 'Water Inventory',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 6,
          data_key: 'category_level_10',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_10%22%7D',
      },
    },
    id: {
      material_issue_id: 6,
      data_key: 'category_level_10',
      data_value: 'water_inventory',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_10%22%2C%22data_value%22%3A%22water_inventory%22%7D',
  },
  {
    attributes: {
      description: 'Water Operational Risk Assessment',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 6,
          data_key: 'category_level_10',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_10%22%7D',
      },
    },
    id: {
      material_issue_id: 6,
      data_key: 'category_level_10',
      data_value: 'water_operational_risk_assessment',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A6%2C%22data_key%22%3A%22category_level_10%22%2C%22data_value%22%3A%22water_operational_risk_assessment%22%7D',
  },
];

export default WATER_MANAGEMENT;
