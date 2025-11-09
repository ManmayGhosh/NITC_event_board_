// import React from "react";
// import ModalView from "../common/ModalView.jsx";

// /**
//  * EventDetailModal
//  * Props:
//  *  - open, onClose
//  *  - event: object with fields name,date,time,venue,associationName,associationHead,description,registrationLink,banner,posterPreview,id
//  *  - showActions (bool) -> when true, shows admin action buttons
//  *  - onAction (fn) -> (id, action) called when admin clicks Allow/Deny/Review
//  */
// export default function EventDetailModal({ open, onClose, event = {}, showActions = false, onAction }) {
//   return (
//     <Modal open={open} onClose={onClose} className="p-4">
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="p-6">
//           <div className="flex gap-4 items-start">
//             <div className="flex-1">
//               <h2 className="text-2xl font-semibold text-gray-800">{event?.name || "Untitled Event"}</h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 {event?.date || "-"} • {event?.time || "-"} • {event?.venue || "-"}
//               </p>
//               <p className="text-sm text-gray-600 mt-2">
//                 Association: <span className="font-medium">{event?.associationName || "-"}</span>
//               </p>
//               <p className="text-sm text-gray-600">Head: {event?.associationHead || "-"}</p>
//               <p className="text-sm text-gray-600">Submitted by: {event?.email || "-"}</p>
//             </div>

//             <div className="w-44 h-28 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
//               {event?.banner ? (
//                 <img src={event.banner} alt="banner" className="w-full h-full object-cover" />
//               ) : event?.posterPreview ? (
//                 <img src={event.posterPreview} alt="poster" className="w-full h-full object-cover" />
//               ) : (
//                 <div className="text-gray-400">No Image</div>
//               )}
//             </div>
//           </div>

//           <div className="mt-4">
//             <h3 className="font-semibold text-gray-700">Description</h3>
//             <p className="text-gray-600 whitespace-pre-wrap">{event?.description || "—"}</p>
//           </div>

//           {event?.registrationLink && (
//             <div className="mt-4">
//               <a href={event.registrationLink} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
//                 Open registration link
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
//           <button onClick={onClose} className="px-4 py-2 rounded-md border hover:bg-gray-100">Close</button>

//           {showActions && (
//             <>
//               <button onClick={() => onAction?.(event.id, "Denied")} className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">Deny</button>
//               <button onClick={() => onAction?.(event.id, "Review Requested")} className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500">Ask to Modify</button>
//               <button onClick={() => onAction?.(event.id, "Approved")} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Allow</button>
//             </>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// }

// src/components/modals/EventDetailModal.jsx
import React from "react";
import ModalView from "../common/ModalView.jsx";

export default function EventDetailModal({
  open,
  onClose,
  event = {},
  showActions = false,
  onAction,
}) {
  return (
    <ModalView show={open} onClose={onClose} title={event?.name || "Event Details"}>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">
            {event?.date || "-"} • {event?.time || "-"} • {event?.venue || "-"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Association: <span className="font-medium">{event?.associationName || "-"}</span>
          </p>
          <p className="text-sm text-gray-600">
            Head: {event?.associationHead || "-"}
          </p>
          <p className="text-sm text-gray-600">
            Submitted by: {event?.email || "-"}
          </p>
        </div>

        <div className="w-full flex justify-center">
          {event?.banner ? (
            <img
              src={event.banner}
              alt="banner"
              className="w-full max-w-sm rounded-lg shadow"
            />
          ) : event?.posterPreview ? (
            <img
              src={event.posterPreview}
              alt="poster"
              className="w-full max-w-sm rounded-lg shadow"
            />
          ) : (
            <div className="text-gray-400 italic">No Image</div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap">
            {event?.description || "—"}
          </p>
        </div>

        {event?.registrationLink && (
          <div className="mt-3">
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              Open registration link
            </a>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border hover:bg-gray-100"
          >
            Close
          </button>

          {showActions && (
            <>
              <button
                onClick={() => onAction?.(event.id, "Denied")}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Deny
              </button>
              <button
                onClick={() => onAction?.(event.id, "Review Requested")}
                className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500"
              >
                Ask to Modify
              </button>
              <button
                onClick={() => onAction?.(event.id, "Approved")}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Allow
              </button>
            </>
          )}
        </div>
      </div>
    </ModalView>
  );
}
