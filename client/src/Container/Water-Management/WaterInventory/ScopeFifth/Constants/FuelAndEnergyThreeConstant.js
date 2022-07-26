const FUEL_AND_ENERGY_THREE = [
  {
    attributes: {
      description: 'Discharges',
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
      material_issue_segment_id: 36,
      data_key: 'discharge_destination',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A36%2C%22data_key%22%3A%22discharge_destination%22%7D',
    dependent_parent: [],
    dependent_data_keys: [
      'water_tds_level',
    ],
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
      material_issue_segment_id: 36,
      data_key: 'description',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A36%2C%22data_key%22%3A%22description%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Water TDS level',
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
      material_issue_segment_id: 36,
      data_key: 'water_tds_level',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A36%2C%22data_key%22%3A%22water_tds_level%22%7D',
    dependent_parent: [
      'discharge_destination',
    ],
    dependent_data_keys: [
      'water_quality_classification',
    ],
  },
  {
    attributes: {
      description: 'Water quality classification',
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
      material_issue_segment_id: 36,
      data_key: 'water_quality_classification',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A36%2C%22data_key%22%3A%22water_quality_classification%22%7D',
    dependent_parent: [
      'water_tds_level',
    ],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Volume of water',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-1',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 36,
      data_key: 'volume_of_water',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A36%2C%22data_key%22%3A%22volume_of_water%22%7D',
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
    container: 'col-sm-1',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 36,
      data_key: 'unit_of_measure',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A36%2C%22data_key%22%3A%22unit_of_measure%22%7D',
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
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 36,
      data_key: 'flows_obtained_and_confidence_level',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A36%2C%22data_key%22%3A%22flows_obtained_and_confidence_level%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

];

export default FUEL_AND_ENERGY_THREE;
