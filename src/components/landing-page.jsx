import { React, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './landing-page.css';

const LandingPage = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <div className="landingPage">
      <div className="container-fluid p-5 landingPageContainer">
        <br/>
        <div className="row">
          <div className="col landingPageTitle">Sticky Shoes</div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-8 col-sm-10 siteInfo">
            Welcome to Sticky Shoes! This is the one stop destination for all your rock climbing shoe needs.
            No need to navigate from site to site. We here at Sticky Shoes co. have compiled the greatest and
            hottest climbing shoes on the market.
          </div>
        </div>
        <br/><br/>
        <div className="row">
          <div className="col">
            <button onClick={() => toggleModal()} className="landingPageButton">Explore</button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalIsOpen}>
        <ModalHeader>
          We hope you enjoy your time here
        </ModalHeader>
        <ModalBody>
          Disclaimer: This is not a real e-commerce site and is for demonstration purposes only.
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => props.setView('catalog')} color="primary">Agree</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LandingPage;
