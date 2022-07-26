const FUGITIVE_EMISSION = [
  {
    attributes: {
      description: 'Compound',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-3',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 4,
      data_key: 'chemical_compound',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A4%2C%22data_key%22%3A%22chemical_compound%22%7D',
    dependent_parent: [],
    dependent_data_keys: [
      'chemical_compound_variant',
    ],
  },
  {
    attributes: {
      description: 'Variant',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-3',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 4,
      data_key: 'chemical_compound_variant',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A4%2C%22data_key%22%3A%22chemical_compound_variant%22%7D',
    dependent_parent: [
      'chemical_compound',
    ],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Emissions (leakage/releases)',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-3',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 4,
      data_key: 'emissions',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A4%2C%22data_key%22%3A%22emissions%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Unit',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-3',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 4,
      data_key: 'unit_of_measure',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A4%2C%22data_key%22%3A%22unit_of_measure%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
];
export default FUGITIVE_EMISSION;
