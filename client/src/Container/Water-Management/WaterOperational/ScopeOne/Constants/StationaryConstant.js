const STATIONARY_COMBUSTION = [
  {
    title: null,
    attributes: {
      description: 'Industry type',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'water_industries_list',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_water_industry%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: 'Physical Risk -- Water Scarcity',
    attributes: {
      description: 'In which ways does the site use water?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q1',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q1%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'How important is the current and future use of water quantity and quality for operating/processing at this site?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q2',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q2%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: 'Physical Risk -- Water Quality',
    attributes: {
      description: 'Is it necessary to treat/purify the water the site withdraws before its use in operations?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q3',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q3%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Is it necessary to treat/purify the water the site withdraws after its use in operations?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q4',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q4%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: "What is the potential impact of the site's operations on downstream water quality in terms of physical, chemical and biological parameters?",
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q5',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q5%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: 'Regulatory Risk -- Enabling Environment',
    attributes: {
      description: 'Relative to other water users in your local catchment (~ 50km radius), does this site face heavy water-related regulation and legal enforcement?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q6',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q6%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: 'Regulatory Risk -- Institutions & Governance',
    attributes: {
      description: 'Is the site always in compliance with legal waste water quality standards?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q7',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q7%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: 'Reputational Risk -- Conflict',
    attributes: {
      description: 'Relative to other water users in your local catchment (~ 50km radius), is the company associated with the site a recognized brand (to the local public)?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q9',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q9%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Relative to other water users in your local catchment (~ 50km radius), would you consider the site a large water user/polluter?',
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q8',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q8%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: "How would you describe this site's general water management/stewardship maturity?",
      data_value_validation_id: 'list_single',
      active: 1,
    },
    required: true,
    container: 'col-sm-12',
    references: {
      material_issue: {
        id: 6,
        link: 'http://10.0.1.108/api/v1/meta-material-issues/6',
      },
    },
    id: {
      material_issue_id: 6,
      material_issue_segment_id: 37,
      data_key: 'rra_q10',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A37%2C%22data_key%22%3A%22rra_q10%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
];

export default STATIONARY_COMBUSTION;
