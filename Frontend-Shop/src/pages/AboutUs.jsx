import React from 'react';
import Wrapper from '../components/Wrapper';

const AboutUs = () => {
  return (
    <Wrapper>
      <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">About Us</h1>
      <p className="text-sm text-slate-800">
        We are a digital product marketplace offering the latest and most innovative digital products delivered directly to your email. Our mission is to provide seamless access to top-tier digital goods, from software and eBooks to educational content and exclusive memberships. We ensure quick and secure transactions, with a commitment to customer satisfaction.
      </p>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Our Vision</h2>
        <p className="text-sm text-slate-800 mt-2">
          We aim to revolutionize the way people buy and access digital products, ensuring instant delivery and unbeatable convenience.
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Our Values</h2>
        <ul className="list-disc ml-6 mt-2 text-sm text-slate-800">
          <li>Customer-Centric Approach</li>
          <li>Innovation and Quality</li>
          <li>Security and Privacy</li>
          <li>Continuous Improvement</li>
        </ul>
      </div>
    </div>
    </Wrapper>
  );
};

export default AboutUs;
