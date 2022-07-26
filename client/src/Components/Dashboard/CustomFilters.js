/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { RiFilterFill } from 'react-icons/ri';
import {
  Button, Col, Input, Label,
} from 'reactstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import ApexCharts from 'apexcharts';

const CustomFilters = ({
  seriesName, ind, isPie, onChange,
}) => {
  const tempCheck = [true];
  const [isActive, setActive] = useState(false);
  const [isToggled, setIsToggled] = useState(true);
  const [yearChecked, setYearChecked] = useState(tempCheck.fill(false, 1, seriesName?.length));

  const ToggleClass = () => {
    setActive(!isActive);
  };

  const selectCat = (name, i) => {
    setIsToggled(!isToggled);
    ApexCharts.exec(`table${ind}`, 'toggleSeries', name);
  };
  const handleYearOnChange = (elementindex) => {
    yearChecked.fill(false, 0, yearChecked.length);
    yearChecked[elementindex] = true;
  };
  return (
    <>
      <Button onClick={ToggleClass}>
        <RiFilterFill />
      </Button>
      {isActive && (
        <Col className="filter-options">
          <h6>Parameters</h6>
          <ul>
            {
              !isPie
                ? seriesName?.map((label, i) => (
                  <li key={i}>
                    <Label className="d-flex">
                      <Input
                        defaultChecked={isToggled}
                        onChange={() => selectCat(label?.name, i)}
                        type="checkbox"
                        name="scope"
                        className="me-2"
                      />
                      <span>{label?.name?.replace('_', '  ')}</span>
                    </Label>
                  </li>
                ))
                : seriesName?.map((yearLabel, i) => (
                  <li key={i}>
                    <Label className="d-flex">
                      <Input
                        type="checkbox"
                        onChange={() => { onChange(i); handleYearOnChange(i); }}
                        name="scope"
                        className="me-2"
                        checked={yearChecked[i]}
                      />
                      <span>{yearLabel}</span>
                    </Label>
                  </li>
                ))
            }
          </ul>
        </Col>
      )}
    </>
  );
};

CustomFilters.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  seriesName: PropTypes.arrayOf(PropTypes.any),
  isPie: PropTypes.bool,
  ind: PropTypes.number,
  onChange: PropTypes.func,
};
CustomFilters.defaultProps = {
  seriesName: null,
  ind: null,
  isPie: null,
  onChange: null,
};

export default CustomFilters;
