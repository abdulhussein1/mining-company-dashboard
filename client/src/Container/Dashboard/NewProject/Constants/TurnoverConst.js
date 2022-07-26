const TURNOVER_DATA_KEY = [
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Year',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'turnover',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/turnover',
      },
    },
    id: {
      segment_id: 'turnover',
      data_key: 'date_year',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22turnover%22%2C%22data_key%22%3A%22date_year%22%7D',
  },
  {
    attributes: {
      data_type_id: 'integer',
      description: 'Million USD',
      active: 1,
    },
    references: {
      project_detail_segment: {
        id: 'turnover',
        link: 'http://10.0.1.108/api/v1/meta-project-detail-segments/turnover',
      },
    },
    id: {
      segment_id: 'turnover',
      data_key: 'usd_million',
    },
    link: 'http://10.0.1.108/api/v1/meta-project-detail-data-keys/%7B%22segment_id%22%3A%22turnover%22%2C%22data_key%22%3A%22usd_million%22%7D',
  },
];

export default TURNOVER_DATA_KEY;
