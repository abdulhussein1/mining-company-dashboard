const PROCESS_OF_SOLID = [
  {
    attributes: {
      description: 'Type of intermediate product sold',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 23,
      data_key: 'type_of_intermediate_product_sold',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A23%2C%22data_key%22%3A%22type_of_intermediate_product_sold%22%7D',
    dependent_parent: [],
    dependent_data_keys: [
      'type_of_technology_or_method_used',
    ],
  },
  {
    attributes: {
      description: 'Type of technology or method used',
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
      material_issue_segment_id: 23,
      data_key: 'type_of_technology_or_method_used',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A23%2C%22data_key%22%3A%22type_of_technology_or_method_used%22%7D',
    dependent_parent: [
      'type_of_intermediate_product_sold',
    ],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Process Description',
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
      material_issue_segment_id: 23,
      data_key: 'process_or_activity',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A23%2C%22data_key%22%3A%22process_or_activity%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

  {
    attributes: {
      description: 'Mass of sold intermediate product',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 23,
      data_key: 'mass_of_sold_intermediate_product',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A23%2C%22data_key%22%3A%22mass_of_sold_intermediate_product%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

  {
    attributes: {
      description: 'Units',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-2',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 23,
      data_key: 'unit_of_measure',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A23%2C%22data_key%22%3A%22unit_of_measure%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
];

export default PROCESS_OF_SOLID;
