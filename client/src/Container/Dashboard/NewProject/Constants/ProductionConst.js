const PRODUCTION_DATA_KEY = [
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Year',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'production_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/production_details',
      },
    },
    id: {
      segment_id: 'production_details',
      data_key: 'date_year',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22production_details%22%2C%22data_key%22%3A%22date_year%22%7D',
  },
  {
    attributes: {
      data_type_id: 'char_string',
      description: 'Product',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'production_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/production_details',
      },
    },
    id: {
      segment_id: 'production_details',
      data_key: 'product',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22production_details%22%2C%22data_key%22%3A%22product%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Ore Production (tonnes per annum)',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'production_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/production_details',
      },
    },
    id: {
      segment_id: 'production_details',
      data_key: 'ore_production_tonnes_per_annum',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22production_details%22%2C%22data_key%22%3A%22ore_production_tonnes_per_annum%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Ore Grade (%)',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'production_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/production_details',
      },
    },
    id: {
      segment_id: 'production_details',
      data_key: 'ore_grade_percentage',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22production_details%22%2C%22data_key%22%3A%22ore_grade_percentage%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Pure metal production (tonnes per annum)',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'production_details',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/production_details',
      },
    },
    id: {
      segment_id: 'production_details',
      data_key: 'pure_metal_prod_tonnes_per_annum',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22production_details%22%2C%22data_key%22%3A%22pure_metal_prod_tonnes_per_annum%22%7D',
  },
];

export default PRODUCTION_DATA_KEY;
