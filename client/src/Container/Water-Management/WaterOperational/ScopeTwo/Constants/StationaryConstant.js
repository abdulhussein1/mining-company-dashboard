/* eslint-disable max-len */
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
      material_issue_segment_id: 42,
      data_key: 'dra_water_industries_list',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_water_industries_list%22%7D',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q1',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q1%22%7D',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q2',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q2%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Has the site had problems withdrawing the required amount of water for its operations OR has the site experienced a significant flooding event affecting operations?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q3',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q3%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'What is the total annual amount of freshwater withdrawn (directly from any water source including municipal supply utilities) in m/year?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q4',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q4%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'What is the total annual amount of freshwater discharged from this site to any endpoint (including municipal wastewater utilities) in mB3/year?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q5',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q5%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'What is the primary source(s) of energy serving the site?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q6',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q6%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

  {
    title: 'Physical Risk -- Water Quality',
    attributes: {
      description: 'Of your discharged freshwater, what percentage contains contaminants and is discharged directly to the environment (not to another entity such as on-/off-site water treatment plants)?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q7',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q7%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
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
      material_issue_segment_id: 42,
      data_key: 'dra_q8',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q8%22%7D',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q9',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q9%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Does the site use hazardous chemicals in its operations or store them on site?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q10',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q10%22%7D',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q11',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q11%22%7D',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q12',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q12%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Is the company exposed to planned or potential significant regulatory changes at this site?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q13',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q13%22%7D',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q14',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q14%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Has this site been subject to any fines, enforcement orders, and/or other penalties for water-related regulatory violations in the last year?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q15',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q15%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Does an official forum or platform exist in which the site and stakeholders come together to discuss water-related issues of the basin?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q16',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q16%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

  {
    title: 'Reputational Risk -- Media Scrutiny',
    attributes: {
      description: 'Has there been any local/national media coverage that identifies this site (negatively) on a water issue in the past 5 years?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q17',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q17%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Has there been any global media coverage that identifies this site or its parent company (negatively) on a water issue in the past 5 years?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q18',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q18%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

  {
    title: 'Reputational Risk -- Conflict',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q19',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q19%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
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
      material_issue_segment_id: 42,
      data_key: 'dra_q20',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q20%22%7D',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q21',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q21%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },
  {
    title: null,
    attributes: {
      description: 'Has the company had involvement in any water-related disputes with other stakeholders in the basin within the last 5 years?',
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
      material_issue_segment_id: 42,
      data_key: 'dra_q22',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-data-keys/%7B%22material_issue_id%22%3A6%2C%22material_issue_segment_id%22%3A42%2C%22data_key%22%3A%22dra_q22%22%7D',
    dependent_parent: [],
    dependent_data_keys: [],
  },

];

export default STATIONARY_COMBUSTION;
