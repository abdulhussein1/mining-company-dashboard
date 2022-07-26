const SCOPE_INSIDE_TABS = [
  {
    attributes: {
      description: 'Purchased Goods and Services',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'purchased_goods_and_services',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22purchased_goods_and_services%22%7D',
  },
  {
    attributes: {
      description: 'Capital Goods',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'capital_goods',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22capital_goods%22%7D',
  },
  {
    attributes: {
      description: 'Fuel and Energy Related Activities Not Included in Scope 1 or Scope 2',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'fuel_and_energy_related_activities_not_included_in_scope1_and_scope2',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22fuel_and_energy_related_activities_not_included_in_scope1_and_scope2%22%7D',
  },
  {
    attributes: {
      description: 'Upstream Transportation & Distribution (T&D)',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'upstream_transportation_and_distribution',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22upstream_transportation_and_distribution%22%7D',
  },
  {
    attributes: {
      description: 'Waste Generated in Operations',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'waste_generated_in_operations',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22waste_generated_in_operations%22%7D',
  },
  {
    attributes: {
      description: 'Business Travel',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'business_travel',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22business_travel%22%7D',
  },
  {
    attributes: {
      description: 'Employee Commuting',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'employee_commuting',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22employee_commuting%22%7D',
  },
  {
    attributes: {
      description: 'Upstream Leased Assets',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'upstream_leased_assets',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22upstream_leased_assets%22%7D',
  },
  {
    attributes: {
      description: 'Downstream Transportation & Distribution (T&D)',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'downstream_transportation_and_distribution',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22downstream_transportation_and_distribution%22%7D',
  },
  {
    attributes: {
      description: 'Processing of Sold Products',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'processing_of_solid_products',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22processing_of_solid_products%22%7D',
  },
  {
    attributes: {
      description: 'Use of Sold Products',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'use_of_sold_products',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22use_of_sold_products%22%7D',
  },
  {
    attributes: {
      description: 'End-of-Life Treatment of Sold Products',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'end_of_life_treatment_of_sold_products',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22end_of_life_treatment_of_sold_products%22%7D',
  },
  {
    attributes: {
      description: 'Downstream Leased Assets',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'downstream_leased_assets',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22downstream_leased_assets%22%7D',
  },
  {
    attributes: {
      description: 'Franchises',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'franschises',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22franschises%22%7D',
  },
  {
    attributes: {
      description: 'Investments',
      active: 1,
    },
    references: {
      material_issue_data_key: {
        id: {
          material_issue_id: 2,
          data_key: 'category_level_30',
        },
        link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-data-keys/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%7D',
      },
    },
    id: {
      material_issue_id: 2,
      data_key: 'category_level_30',
      data_value: 'investments',
    },
    link: 'http://10.0.1.108/api/v1/meta-material-issue-segment-allowed-value-lists/%7B%22material_issue_id%22%3A2%2C%22data_key%22%3A%22category_level_30%22%2C%22data_value%22%3A%22investments%22%7D',
  },
];

export default SCOPE_INSIDE_TABS;
