import { ReactSortable } from 'react-sortablejs';
import { useState } from 'react';
import Table from "react-bootstrap/Table";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { IoIosAddCircleOutline } from "react-icons/io";

const ReceivingQCTable = () => {
    const [switchStates, setSwitchStates] = useState([
    { id: 1, switches: [true, true, true, true, true] },
    { id: 2, switches: [true, true, true, true, true] },
  ]);

  const handleSwitchChange = (rowIdx, colIdx) => {
    const newState = [...switchStates];
    newState[rowIdx].switches[colIdx] = !newState[rowIdx].switches[colIdx];
    setSwitchStates(newState);
  };

const IOSSwitch = styled((props) => (
 <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 37,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 1,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 15,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#FF052B',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

  return (
        <div className="mt-2 mb-5 mx-4 pi-table">
       <div className="pi-table-scroll-wrapper">
        <div className="pi-table-scroll">
      <Table bordered className="text-center">      
        <thead>
           <tr className="pi-table-head">
            <th colSpan="15">
              <div className="pi-table-header-row d-flex justify-content-between align-items-center">
                <span>Item Master</span>
                <div className='d-flex gap-3'>
                  <span className="edit-icon"><IoIosAddCircleOutline />Add Column</span>
                </div>
              </div>
            </th>
          </tr>
          <tr style={{ textAlign: 'center' }}>
            <th>S.No</th>
            <th>Item Details</th>
            <th>Item Code</th>
            <th>Item Classification</th>
            <th>PO NO</th>
            <th className='rqc-table-head'>
                <p>Batch Qty</p>
                <p>As per BILL</p>
            </th>
            <th>Qty Check</th>
            <th>Item Damage</th>
            <th>Packing Damage</th>
            <th>Item Accuracy</th>
            <th>Label Match</th>
            <th>Comments</th>
            <th>Accepted Qty</th>
          </tr>
        </thead>
       <tbody className="text-center">
        {switchStates.map((row, rowIdx) => (
          <>
            <tr key={`main-${row.id}`}>
              <td>{row.id}</td>
              <td>
                  <Form.Group>
                  <InputGroup>
                    <Form.Control className="rqc-table-textfield" />
                  </InputGroup>
                </Form.Group>
                </td>
              <td>
                  <Form.Group>
                  <InputGroup>
                    <Form.Control className="rqc-table-textfield" />
                  </InputGroup>
                </Form.Group>
                </td>
              <td>
                  <Form.Group>
                  <InputGroup>
                    <Form.Control className="rqc-table-textfield" />
                  </InputGroup>
                </Form.Group>
                </td>
              <td>PO123</td>
              <td>
                  <Form.Group>
                  <InputGroup>
                    <Form.Control className="rqc-table-textfield" />
                  </InputGroup>
                </Form.Group>
                </td>
              {row.switches.map((val, colIdx) => (
                <td key={`switch-${colIdx}`}>
                  <FormControlLabel
                    sx={{ display: "flex", justifyContent: "center", margin: "auto" }}
                    control={
                      <IOSSwitch
                        checked={val}
                        onChange={() => handleSwitchChange(rowIdx, colIdx)}
                      />
                    }
                  />
                </td>
              ))}
              <td>
                  <Form.Group>
                  <InputGroup>
                    <Form.Control className="rqc-table-textfield" />
                  </InputGroup>
                </Form.Group>
                </td>
              <td>
                  <Form.Group>
                  <InputGroup>
                    <Form.Control className="rqc-table-textfield" />
                  </InputGroup>
                </Form.Group>
                </td>
            </tr>
           {row.switches.some(s => !s) && (
  <tr key={`extra-${row.id}`} className="rqc-table-add-row">
    {[...Array(6)].map((_, idx) => (
      <td
        key={`prefix-${idx}`}
        style={{
          backgroundColor: idx < 6 ? '#F8E2E2' : undefined, 
        }}
      >
        {idx === 1 ? (
          <p className='rqc-faulty-text'>Faulty Qty</p>
        ) : null}
      </td>
    ))}
    {row.switches.map((val, colIdx) => (
      <td key={`extra-cell-${colIdx}`}>
        {!val ? (
          <Form.Group>
            <InputGroup>
              <Form.Control className="rqc-table-textfield" />
            </InputGroup>
          </Form.Group>
        ) : (
          ''
        )}
      </td>
    ))}
    <td></td>
    <td></td>
  </tr>
            )}
          </>
        ))}
      </tbody>
      </Table>
    </div>
    </div>
    </div>
  )
}

export default ReceivingQCTable