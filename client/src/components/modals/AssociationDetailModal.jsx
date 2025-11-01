import React from "react";
import Modal from "../common/ModalView";

/**
 * AssociationDetailModal
 * Props:
 *  - open, onClose
 *  - association: object { name, email, collegeId, associationName, timelineStart, timelineEnd, contact, notes }
 */
export default function AssociationDetailModal({ open, onClose, association = {} }) {
  return (
    <Modal open={open} onClose={onClose} className="p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">{association.associationName || "Association"}</h2>
          <p className="text-sm text-gray-600 mt-1">Head: {association.name || "-"}</p>
          <p className="text-sm text-gray-600">Email: {association.email || "-"}</p>
          <p className="text-sm text-gray-600">College ID: {association.collegeId || "-"}</p>
          <p className="text-sm text-gray-600 mt-2">Contact: {association.contact || "-"}</p>
          <p className="text-sm text-gray-600 mt-2">Timeline: {association.timelineStart || "-"} → {association.timelineEnd || "-"}</p>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Notes</h3>
            <p className="text-gray-600">{association.notes || "—"}</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-md border hover:bg-gray-100">Close</button>
        </div>
      </div>
    </Modal>
  );
}
