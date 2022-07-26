const RENEWABLE_ENERGY_CONSTANT = [
  {
    attributes: {
      description: 'Renewable energy source',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-4',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 50,
      data_key: 'renewable_energy_source',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A50%2C%22data_key%22%3A%22renewable_energy_source%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Consumption',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-4',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 50,
      data_key: 'consumption_value',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A50%2C%22data_key%22%3A%22consumption_value%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Unit',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-4',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 50,
      data_key: 'unit_of_measure',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A50%2C%22data_key%22%3A%22unit_of_measure%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
];

export default RENEWABLE_ENERGY_CONSTANT;
