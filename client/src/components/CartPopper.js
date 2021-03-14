import React, { Component } from "react";
import { render } from "react-dom";
// import './style.css';
import Popper from "@material-ui/core/Popper";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const CartPopper = styled(Popper)`&&{
  z-index: 2;
  &[x-placement*="bottom"] .arrow{

    width: 0;
    height: 0;
    border-left: 1em solid transparent;
    border-right: 1em solid transparent;
    border-bottom: 1em solid white;
    margin-top: -0.9em;

    &:before {
      border-width: '0 1em 1em 1em';
      border-color: 'transparent transparent white transparent';
    }
  }

  &[x-placement*="top"] .arrow{

    width: 0;
    height: 0;
    border-left: 1em solid transparent;
    border-right: 1em solid transparent;
    border-bottom: 1em solid white;
    margin-top: -0.9em;

    &:before {
      border-width: '0 1em 1em 1em';
      border-color: 'transparent transparent white transparent';
    }
  }

  &[x-placement*="right"] .arrow{

    left: 0;
    width: 0;
    height: 0;
    border-top: 1em solid transparent;
    border-bottom: 1em solid transparent;
    border-right: 1em solid white;
    margin-left: -0.9em;

    &:before {
      border-width: 1em 1em 1em 0;
      border-color: transparent white transparent transparent;
    }
  }

  &[x-placement*="left"] .arrow{

    right: 0;
    width: 0;
    height: 0;
    border-top: 1em solid transparent;
    border-bottom: 1em solid transparent;
    border-left: 1em solid white;
    margin-right: -0.9em;

    &:before {
      border-width: 1em 0 1em 1em;
      border-color: transparent transparent transparent white;
    }
  }

  .arrow {
    position: absolute;
    font-size: 7px;
    width: 3em;
    height: 3em;

    &:before {
      content: '""',
      margin: auto;
      display: 'grid';
      width: 0;
      height: 0;
      border-style: solid;
    }
  }

  .popper-content {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: black;
    height: 90px;
    width: 160px;
  }

}`;

export default CartPopper;
