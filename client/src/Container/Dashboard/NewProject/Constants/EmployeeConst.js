const EMPLOYEE_DETAILS = [
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Year',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'employee_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/employee_details',
      },
    },
    id: {
      segment_id: 'employee_details',
      data_key: 'date_year',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22employee_details%22%2C%22data_key%22%3A%22date_year%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Company employees',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'employee_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/employee_details',
      },
    },
    id: {
      segment_id: 'employee_details',
      data_key: 'company_employees',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22employee_details%22%2C%22data_key%22%3A%22company_employees%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Contract employees',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'employee_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/employee_details',
      },
    },
    id: {
      segment_id: 'employee_details',
      data_key: 'contract_employees',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22employee_details%22%2C%22data_key%22%3A%22contract_employees%22%7D',
  },
];

export default EMPLOYEE_DETAILS;
