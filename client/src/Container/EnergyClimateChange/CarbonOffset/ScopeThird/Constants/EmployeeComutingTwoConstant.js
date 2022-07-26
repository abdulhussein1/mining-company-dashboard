const EMPLOYEE_COMUTING_TWO = [
  {
    attributes: {
      description: 'Mode of employee commute',
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
      material_issue_segment_id: 21,
      data_key: 'mode_of_employee_commute',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A21%2C%22data_key%22%3A%22mode_of_employee_commute%22%7D',
    dependent_parent: [],
    dependent_data_keys: [
      'unit_of_measure',
    ],
  },
  {
    attributes: {
      description: '% of Employees (Sample Survey )',
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
      material_issue_segment_id: 21,
      data_key: 'percentage_of_employees',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A21%2C%22data_key%22%3A%22percentage_of_employees%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Distance travelled',
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
      material_issue_segment_id: 21,
      data_key: 'distance_value',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A21%2C%22data_key%22%3A%22distance_value%22%7D',
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
    container: 'col-sm-3',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 21,
      data_key: 'unit_of_measure',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A21%2C%22data_key%22%3A%22unit_of_measure%22%7D',
    dependent_parent: [
      'mode_of_employee_commute',
    ],
    dependent_data_keys: [],
  },
];

export default EMPLOYEE_COMUTING_TWO;
