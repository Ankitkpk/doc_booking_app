
import Doctor from "../models/doctorModel.js";

export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required" });
        }
        const doctor = await Doctor.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

         //toggle if is true make it false//
        doctor.availability = !doctor.availability;
        await doctor.save();

        res.status(200).json({
            success: true,
            message: "Doctor availability updated successfully",
            data: doctor,
        });

    } catch (error) {
        console.error("Error updating doctor availability:", error);
        res.status(500).json({
            success: false,
            message: "Error updating doctor availability",
            error: error.message,
        });
    }
};
