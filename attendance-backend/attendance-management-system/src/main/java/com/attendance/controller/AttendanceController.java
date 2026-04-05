package com.attendance.controller;

import com.attendance.dto.ApiResponse;
import com.attendance.dto.AttendanceRequest;
import com.attendance.dto.AttendanceResponse;
import com.attendance.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    /**
     * POST /attendance/mark
     * Mark attendance for a student
     */
    @PostMapping("/mark")
    public ResponseEntity<ApiResponse<AttendanceResponse>> markAttendance(
            @Valid @RequestBody AttendanceRequest request) {

        AttendanceResponse response = attendanceService.markAttendance(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Attendance marked successfully", response));
    }

    /**
     * GET /attendance/user/{id}
     * Get all attendance records for a specific student
     */
    @GetMapping("/user/{id}")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getAttendanceByUser(
            @PathVariable Long id) {

        List<AttendanceResponse> list = attendanceService.getAttendanceByUser(id);
        return ResponseEntity.ok(ApiResponse.success("Attendance fetched for user " + id, list));
    }

    /**
     * GET /attendance/all
     * Get all attendance records (Admin only)
     */
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getAllAttendance() {

        List<AttendanceResponse> list = attendanceService.getAllAttendance();
        return ResponseEntity.ok(ApiResponse.success("All attendance records fetched", list));
    }
}
