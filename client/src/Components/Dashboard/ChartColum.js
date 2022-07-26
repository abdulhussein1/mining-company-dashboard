/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { trimName } from '../../Utils/globalFunctions';
// import { convertFormat } from '../../Utils/globalFunctions';

const ChartColumn = ({ data, unit }) => {
  const totalRow = useMemo(() => (
    data?.length > 0 ? JSON.parse(data[0].attributes.data_value) : {}),
  // eslint-disable-next-line
  data);

  const returnTableHeading = (scope, dataValue) => {
    const returnData = typeof dataValue[scope] !== 'undefined' ? JSON.parse(dataValue[scope]) : 0;
    if (typeof returnData === 'object') {
      return (
        <td className="p-0">
          <table className="child_table_data">
            <thead>
              <tr>
                {Object.keys(returnData).map((item) => (<th>{item.replaceAll('_', ' ')}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(returnData).map((item) => (<td>{item}</td>))}
              </tr>
            </tbody>
          </table>
        </td>
      );
    }
    return <td>{parseFloat(returnData, 10).toFixed(2)}</td>;
  };

  return (
    <>
      <tbody>
        {Object.keys(totalRow).map((item) => (
          <tr>
            <td>{trimName(item)}</td>
            <td>{unit}</td>
            {data.map((its) => returnTableHeading(item, JSON.parse(its.attributes.data_value)))}
          </tr>
        ))}
      </tbody>
    </>
  );
};

ChartColumn.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  unit: PropTypes.string,
};
ChartColumn.defaultProps = {
  data: null,
  unit: null,
};

export default ChartColumn;
