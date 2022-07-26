const SCOPES = [
  {
    attributes: {
      description: 'Scope 1',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_20',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_20%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_20',
      data_value: 'scope1',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_20%22%2C%22data_value%22%3A%22scope1%22%7D',
  },
  {
    attributes: {
      description: 'Scope 2',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_20',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_20%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_20',
      data_value: 'scope2',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_20%22%2C%22data_value%22%3A%22scope2%22%7D',
  },
  {
    attributes: {
      description: 'Scope 3',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_20',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_20%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_20',
      data_value: 'scope3',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_20%22%2C%22data_value%22%3A%22scope3%22%7D',
  },
];

export default SCOPES;
