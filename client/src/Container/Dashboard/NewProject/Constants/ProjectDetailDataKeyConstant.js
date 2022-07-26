const PROJECT_DETAIL_DATA_KEY_ONE = [
  {
    attributes: {
      data_type_id: 'char_string',
      description: 'Product extracted at mine site',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'mining_products',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/mining_products',
      },
    },
    id: {
      segment_id: 'mining_products',
      data_key: 'extracted_product_id',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22mining_products%22%2C%22data_key%22%3A%22extracted_product_id%22%7D',
  },
  {
    attributes: {
      data_type_id: 'char_string',
      description: 'Unit',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'mining_products',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/mining_products',
      },
    },
    id: {
      segment_id: 'mining_products',
      data_key: 'unit_of_physical_measure_id',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22mining_products%22%2C%22data_key%22%3A%22unit_of_physical_measure_id%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Estimated ore resources',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'mining_products',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/mining_products',
      },
    },
    id: {
      segment_id: 'mining_products',
      data_key: 'estimated_ore_resources',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22mining_products%22%2C%22data_key%22%3A%22estimated_ore_resources%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Average purity of ore - estimated (%)',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'mining_products',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/mining_products',
      },
    },
    id: {
      segment_id: 'mining_products',
      data_key: 'avg_purity_ore_percentage',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22mining_products%22%2C%22data_key%22%3A%22avg_purity_ore_percentage%22%7D',
  },
];

export default PROJECT_DETAIL_DATA_KEY_ONE;
