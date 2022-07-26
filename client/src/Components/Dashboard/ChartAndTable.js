/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Col, Label, Table, Media,
} from 'reactstrap';
import { BiPieChartAlt2, BiDownload } from 'react-icons/bi';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { convertFormat, getYearDifferenceNew } from '../../Utils/globalFunctions';
import CustomFilters from './CustomFilters';
import ChartColumn from './ChartColum';
import CustomChartRiskAssessment from './CustomChartRiskAssessment';

const ChartAndTable = ({
  itemVal, index, data, duration, filterData,
}) => {
  const [isActive, setActive] = useState(false);
  const pieOptionConst = {
    type: 'pie',
    id: `piechart${index}`,
    height: 350,
    toolbar: {
      show: true,
      tools: {
        download: '<img src={require("./public/download.png")}/>',
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
      autoSelected: 'zoom',
    },
  };
  const [pieOptions, setPieOptions] = useState(pieOptionConst);
  const [pieSeries, setPieSeries] = useState([44, 55, 13, 43, 12]);
  const [pieLabels, setPieLabels] = useState(['A', 'B', 'C', 'D', 'E']);
  const [pieActive, setPieActive] = useState(false);
  const ToggleClass = () => {
    setActive(!isActive);
  };

  const defaultActive = useMemo(
    () => data.find((item) => item.attributes.data_key === itemVal),
    // eslint-disable-next-line
    [itemVal, data]);

  const dat = useMemo(
    () => data.filter((item) => item.attributes.data_key === itemVal),
    // eslint-disable-next-line
    [itemVal, data]);

  // eslint-disable-next-line
  const mainFields = useMemo(
    () => data.find((item) => item.attributes.data_key === itemVal)?.attributes?.data_value,
    [itemVal, data],
  );

  const allYears = useMemo(() => {
    const dsd = duration.map((item) => {
      return getYearDifferenceNew({
        d1: item.attributes.start_date,
        d2: item.attributes.end_date,
      });
    });
    return _.uniq([...new Set(dsd.flat())]);
    // eslint-disable-next-line
  }, [duration, data]);

  // table structure
  const returnTableHeading = (item) => {
    return <th>{convertFormat({ date: item.attributes.data_date, from: 'YYYY-MM-DD', to: 'YYYY' })}</th>;
  };

  const tableChart = {
    // eslint-disable-next-line no-mixed-operators
    series:
      (mainFields
        && Object.keys(JSON.parse(mainFields)).map((item) => ({
          name: item.replaceAll('_', ' '),
          data: allYears.map((year) => {
            const yeardata = data.find(
              (it) => convertFormat({ date: it.attributes.data_date, from: 'YYYY-MM-DD', to: 'YYYY' }) === year
                && it.attributes.data_key === itemVal,
            )?.attributes?.data_value;
            return (yeardata && parseInt(JSON.parse(yeardata)[item], 10)) || 0;
          }),
          // eslint-disable-next-line no-mixed-operators
        })))
      || [],
    options: {
      chart: {
        id: `table${index}`,
        height: 320,
        type: 'line',
        zoom: {
          enabled: false,
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#d27c49', '#00a8d0', '#393978', '#612853', '#0f2445', '#548ec5'],
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: defaultActive?.attributes?.unit,
        align: 'left',
        offsetY: 0,
      },
      legend: {
        showForSingleSeries: true,
        tooltipHoverFormatter(val, opts) {
          return `${val} : ${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}`;
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: allYears,
      },
      yaxis: {
        labels: {
          formatter(value) {
            return value.toLocaleString();
          },
        },
      },
      tooltip: {
        y: [
          {
            title: {
              formatter(val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    },
  };
  const pieSeriesExtract = (yearIndex) => {
    return tableChart?.series?.map((yearData) => yearData.data[yearIndex]);
  };
  useEffect(() => {
    if (pieActive) {
      setPieSeries(pieSeriesExtract(0));
      setPieLabels(tableChart.series?.map((yearData) => yearData?.name));
    }
    // eslint-disable-next-line
  }, [pieActive]);
  const pieChart = {
    series: [...pieSeries],
    option: {
      chart: { ...pieOptions },
      labels: [...pieLabels],
      legend: {
        show: true,
        position: 'bottom',
      },
      colors: ['#d27c49', '#00a8d0', '#393978', '#612853', '#0f2445', '#548ec5'],
    },
  };
  const update = (i) => {
    if (pieSeriesExtract(i).every((value) => (value !== 0) === false)) {
      setPieOptions(pieOptionConst);
      setPieSeries([0]);
      setPieLabels(['No Data Available for this year']);
      return;
    }
    setPieSeries(pieSeriesExtract(i));
    setPieOptions(pieOptionConst);
    setPieLabels(tableChart.series?.map((yearData) => yearData?.name));
  };
  return (
    <Col sm={6} key={index}>
      <Col className="shadow p-3 bg-white rounded mb-4">
        <Col className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="secondary_font font-weight-bold mb-0">{defaultActive?.attributes?.description}</h5>
          <div
            className={
              filterData?.materialIssuesChild[0] !== 'risk_assessment'
                ? 'toggle_button_container'
                : 'toggle_button_container d-flex justify-content-end'
            }
          >
            {filterData?.materialIssuesChild[0] !== 'risk_assessment' ? (
              <div>
                <Label>
                  <BiPieChartAlt2
                    size={28}
                    color="#fff"
                    className="pie_action_btn"
                    onClick={() => setPieActive(!pieActive)}
                  />
                </Label>
              </div>
            ) : null}
            <div className="switch_button">
              <Label>
                <input type="checkbox" checked={isActive} onChange={ToggleClass} />
                <span />
              </Label>
            </div>
          </div>
        </Col>

        {isActive && (
          <Col className="table-responsive auto-adjust-width">
            <Table striped bordered className="modalTable detailModalPart">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Unit</th>
                  {dat.map((it) => {
                    return returnTableHeading(it);
                  })}
                </tr>
              </thead>
              <ChartColumn data={dat} unit={defaultActive?.attributes?.unit} />
            </Table>
          </Col>
        )}
        {!isActive && (
          <Col className="position-relative">
            {filterData?.materialIssuesChild[0] !== 'risk_assessment' ? (
              <>
                {mainFields?.length !== 2 ? (
                  <Col className="custom-filter-chart">
                    <CustomFilters
                      ind={index}
                      seriesName={pieActive ? allYears : tableChart.series}
                      isPie={pieActive}
                      onChange={update}
                    />
                  </Col>
                ) : null}
                {pieActive === false && tableChart?.series?.length !== 0 ? (
                  <Chart
                    options={tableChart.options}
                    series={tableChart.series}
                    width="100%"
                    type="line"
                    height="320"
                  />
                ) : (
                  <Col style={{ display: pieActive && 'none' }} className="custom-chart-no-data line-chart-no-data">
                    <p className="mb-0">No Data Available</p>
                  </Col>
                )}

                {pieActive && (
                  <Chart options={pieChart.option} series={pieChart.series} width="100%" type="pie" height="320" />
                )}
              </>
            ) : (
              <>
                <CustomChartRiskAssessment data={dat} />
              </>
            )}
          </Col>
        )}
      </Col>
    </Col>
  );
};

ChartAndTable.propTypes = {
  itemVal: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
  duration: PropTypes.arrayOf(PropTypes.any),
  index: PropTypes.number,
  filterData: PropTypes.objectOf(PropTypes.any),
};
ChartAndTable.defaultProps = {
  itemVal: null,
  data: null,
  duration: null,
  index: null,
  filterData: null,
};

export default ChartAndTable;
