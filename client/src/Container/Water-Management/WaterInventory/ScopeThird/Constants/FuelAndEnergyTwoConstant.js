const FUEL_AND_ENERGY_TWO = [
  {
    attributes: {
      description: 'Storage',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 32,
      data_key: 'storage',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A32%2C%22data_key%22%3A%22storage%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Description',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 32,
      data_key: 'description',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A32%2C%22data_key%22%3A%22description%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Volume of water',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 32,
      data_key: 'volume_of_water',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A32%2C%22data_key%22%3A%22volume_of_water%22%7D',
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
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 32,
      data_key: 'unit_of_measure',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A32%2C%22data_key%22%3A%22unit_of_measure%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'How were the flows obtained and what is the confidence level of them?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-4',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 32,
      data_key: 'flows_obtained_and_confidence_level',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A32%2C%22data_key%22%3A%22flows_obtained_and_confidence_level%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

];

export default FUEL_AND_ENERGY_TWO;
