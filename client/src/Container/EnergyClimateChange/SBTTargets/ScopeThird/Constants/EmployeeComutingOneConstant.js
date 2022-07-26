const EMPLOYEE_COMUTING_ONE = [
  {
    attributes: {
      description: 'Total number of employees onsite',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-6',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 20,
      data_key: 'total_number_of_employees_onsite',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A20%2C%22data_key%22%3A%22total_number_of_employees_onsite%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    attributes: {
      description: 'Sample size of employee survey',
      data_value_validation_id: 'none',
      active: 1,
    },
    required: true,
    container: 'col-sm-6',
    references: {
      material_issue: {
        id: 2,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/2',
      },
    },
    id: {
      material_issue_id: 2,
      material_issue_segment_id: 20,
      data_key: 'sample_size_of_employee_survey',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A2%2C%22material_issue_segment_id%22%3A20%2C%22data_key%22%3A%22sample_size_of_employee_survey%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

];

export default EMPLOYEE_COMUTING_ONE;
