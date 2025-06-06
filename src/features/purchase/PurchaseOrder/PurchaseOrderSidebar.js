import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";

const PurchaseOrderSidebar = () => {
  return (
    <div className="col-md-2 po-sidebar">
      <div className="fixed-divider">
        <div className="pi-top-option">
            <div className="col-auto mt-2">
              <Form.Group>
                <Form.Select className="no-border text-muted">
                  <option value="" className="no-border text-muted">
                    All PO
                  </option>
                  <option className="no-border text-muted">Approved</option>
                  <option className="no-border text-muted">Rejected</option>
                  <option className="no-border text-muted">
                    Waiting For Approval
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="pi-options">
              <div className="new-pi-btn">
                <FaPlus size={12} />
                New PO
              </div>
              <div className="more-pi-btn">
                <MdMoreVert size={14} />
              </div>
            </div>
          </div>
          <div class="pi-divider"></div>
      </div>
          <div>
            <label class="pi-sidebar-list">
              <input type="checkbox" class="pi-checkbox" />
              <div class="pi-content">
                <div class="d-flex flex-column">
                  <p>PO NO: XXXXXXX</p>
                  <p>Indruck Systems Ltd</p>
                </div>
              </div>
              <p>45,000 SAR</p>
            </label>
            <div class="pi-divider"></div>
          </div>
          <div>
            <label class="pi-sidebar-list">
              <input type="checkbox" class="pi-checkbox me-2"/>
              <div class="pi-content">
                <div class="d-flex flex-column">
                  <p>P0 NO: XXXXXXX</p>
                  <p>Mesh Systems Ltd</p>
                </div>
              </div>
              <p>45,000 SAR</p>
            </label>
            <div class="pi-divider"></div>
          </div>
    </div>
  )
}

export default PurchaseOrderSidebar