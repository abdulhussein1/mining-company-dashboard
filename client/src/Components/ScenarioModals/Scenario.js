import React, { useState, useEffect } from 'react';
import {
  Modal, ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ScenarioModalTitle from './ScenarioModalTitle';
import ScenarioCreateCopy from './ScenarioCreateCopy';
import ScenarioCopy from './ScenarioCopy';
import ScenarioCreate from './ScenarioCreate';

const ScenarioModal = ({ open, className, close }) => {
  const scenarioOverviewInitial = {
    scenarionamedata: '',
    selectscenario: '',
    selectmaterialissue: '',
  };

  const [title, setTitle] = useState('Select Option');
  const [activeForm, setActiveForm] = useState(1);
  const [scenarioOverview, setscenarioOverview] = useState(scenarioOverviewInitial);

  const MainView = () => {
    if (activeForm === 1) {
      return (
        <ScenarioCreateCopy
          next={() => setActiveForm(2)}
          create={() => setActiveForm(3)}
        />
      );
    } if (activeForm === 2) {
      return (
        <ScenarioCopy
          submit={(val) => {
            close();
            setscenarioOverview(val);
          }}
          initial={scenarioOverview}
        />
      );
    } if (activeForm === 3) {
      return (
        <ScenarioCreate
          submit={(val) => {
            close();
            setscenarioOverview(val);
          }}
          initial={scenarioOverview}
        />
      );
    }
    return (
      <>
      </>
    );
  };

  useEffect(() => {
    if (activeForm === 1) {
      setTitle('Select Option');
    }
    if (activeForm === 2) {
      setTitle('Copy Scenario');
    }
    if (activeForm === 3) {
      setTitle('Create Scenario');
    }
  }, [activeForm]);

  return (
    <>
      <Modal size="md" isOpen={open} toggle={close} className={className}>
        <ScenarioModalTitle
          close={close}
          title={title}
        />
        <ModalBody>
          <MainView />
        </ModalBody>
      </Modal>
    </>
  );
};

ScenarioModal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

ScenarioModal.defaultProps = {
  className: '',
};

export default ScenarioModal;
