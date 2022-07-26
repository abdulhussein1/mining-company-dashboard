/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Collapse } from 'reactstrap';
import { BiChevronDownCircle } from 'react-icons/bi';
import { convertFormat, trimName } from '../../Utils/globalFunctions';

const CustomChartRiskAssessment = ({ data }) => (
  <>
    {data.map((item, index) => (
      <Col className="custom-made-chart d-flex align-items-center" key={index}>
        <Col className="all-years">
          {convertFormat({
            date: item.attributes.data_date,
            from: 'YYYY-MM-DD',
            to: 'YYYY',
          })}
        </Col>
        <Col className="all-data">
          <SingleRowData keyIndex={index} items={item} />
        </Col>
      </Col>
    ))}
  </>
);

const SingleRowData = ({ keyIndex, items }) => {
  const itemNames = Object.keys(JSON.parse(items.attributes.data_value));
  const itemValues = Object.values(JSON.parse(items.attributes.data_value));
  const [expand, setExpand] = useState(false);

  return (
    <>
      <Col className={`single-data-row row-count-${keyIndex}`} key={keyIndex}>
        {itemValues[3] && itemValues[3] > 0 ? (
          <Col className="row single-data">
            <Col className="bar-design col-7">
              <RowData rowValue={itemValues[3]} />
            </Col>
            <Col className="headline col-4">{trimName(itemNames[3])}</Col>
            <Col className="col-1">
              {itemValues && itemValues[0] > 0 ? (
                <BiChevronDownCircle
                  className="mb-4"
                  onClick={() => {
                    setExpand(!expand);
                  }}
                  aria-expanded={expand}
                  aria-controls="collapsed-chart-detail"
                  style={
                    expand
                      ? { cursor: 'pointer', width: '40px', height: '40px' }
                      : {
                        cursor: 'pointer',
                        width: '40px',
                        height: '40px',
                        transform: 'rotate(180deg)',
                      }
                  }
                >
                  Expand Chart
                </BiChevronDownCircle>
              ) : null}
            </Col>
          </Col>
        ) : (
          <Col className="custom-chart-no-data">
            <p className="mb-0">No Data Available</p>
          </Col>
        )}
      </Col>

      <>
        <Col className={`multi-data-row row-count-${keyIndex}`}>
          <Collapse isOpen={expand}>
            <div id="collapsed-chart-detail">
              {expand && (
                <>
                  <>
                    <Col className="row single-data">
                      <Col className={itemValues[0] > 0 ? 'bar-design col-6' : 'col-6'}>
                        <RowData rowValue={itemValues[0]} />
                      </Col>
                      <Col className="headline col-6">{trimName(itemNames[0])}</Col>
                    </Col>
                    <Col className="row single-data">
                      <Col className={itemValues[1] > 0 ? 'bar-design col-6' : 'col-6'}>
                        <RowData rowValue={itemValues[1]} />
                      </Col>
                      <Col className="headline col-6">{trimName(itemNames[1])}</Col>
                    </Col>
                    <Col className="row single-data">
                      <Col className={itemValues[2] > 0 ? 'bar-design col-6' : 'col-6'}>
                        <RowData rowValue={itemValues[2]} />
                      </Col>
                      <Col className="headline col-6">{trimName(itemNames[2])}</Col>
                    </Col>
                  </>
                </>
              )}
            </div>
          </Collapse>
        </Col>
      </>
    </>
  );
};

const RowData = ({ rowValue }) => {
  const newValue = Number(((rowValue - 0) * 100) / (5 - 0));
  const newPosition = 10 - newValue * 0.2;
  return (
    <>
      {rowValue > 0 ? (
        <>
          <Col className="range-slide">
            <div className="range-wrap">
              <div className="range-value" id="rangeV" style={{ left: `calc(${newValue}% + (${newPosition}px))` }}>
                <span>{parseFloat(rowValue, 10).toFixed(1)}</span>
              </div>
              <input
                id="range"
                type="range"
                min="0"
                max="5"
                value={rowValue ? parseFloat(rowValue, 10).toFixed(2) : 0}
                step="0.01"
                disabled
              />
            </div>
          </Col>
          <Col className="no-animate-block">
            <Col className="data-part d-flex mt-1 mb-1">
              <span style={{ backgroundColor: '#f1fccb' }} />
              <span style={{ backgroundColor: '#eefb98' }} />
            </Col>
            <Col>
              <h5>Very Low</h5>
              <p>(1)</p>
            </Col>
          </Col>
          <Col className="no-animate-block">
            <Col className="data-part d-flex mt-1 mb-1">
              <span style={{ backgroundColor: '#fbfc99' }} />
              <span style={{ backgroundColor: '#f5ef95' }} />
            </Col>
            <Col>
              <h5>Low</h5>
              <p>(2)</p>
            </Col>
          </Col>
          <Col className="no-animate-block">
            <Col className="data-part d-flex mt-1 mb-1">
              <span style={{ backgroundColor: '#ead765' }} />
              <span style={{ backgroundColor: '#daae53' }} />
            </Col>
            <Col>
              <h5>Medium</h5>
              <p>(3)</p>
            </Col>
          </Col>
          <Col className="no-animate-block">
            <Col className="data-part d-flex mt-1 mb-1">
              <span style={{ backgroundColor: '#d08d46' }} />
              <span style={{ backgroundColor: '#c76b39' }} />
            </Col>
            <Col>
              <h5>High</h5>
              <p>(4)</p>
            </Col>
          </Col>
          <Col className="no-animate-block">
            <Col className="data-part d-flex mt-1 mb-1">
              <span style={{ backgroundColor: '#ba442c' }} />
              <span style={{ backgroundColor: '#af4029' }} />
            </Col>
            <Col>
              <h5>Very High</h5>
              <p>(5)</p>
            </Col>
          </Col>
        </>
      ) : (
        <Col className="custom-chart-no-data">
          <p className="mb-0">No Data Available</p>
        </Col>
      )}
    </>
  );
};
CustomChartRiskAssessment.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
CustomChartRiskAssessment.defaultProps = {
  data: null,
};
SingleRowData.propTypes = {
  keyIndex: PropTypes.arrayOf(PropTypes.any),
  items: PropTypes.arrayOf(PropTypes.any),
};
SingleRowData.defaultProps = {
  keyIndex: null,
  items: null,
};
RowData.propTypes = {
  rowValue: PropTypes.number,
};
RowData.defaultProps = {
  rowValue: null,
};

export default CustomChartRiskAssessment;
