package com.attendance.service;

import com.attendance.dto.AttendanceRequest;
import com.attendance.dto.AttendanceResponse;
import com.attendance.entity.Attendance;
import com.attendance.entity.User;
import com.attendance.exception.ResourceNotFoundException;
import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    /**
     * Mark attendance for a student.
     */
    public AttendanceResponse markAttendance(AttendanceRequest request) {
        // Check if user exists
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with ID: " + request.getUserId()));

        // Build and save attendance record
        Attendance attendance = Attendance.builder()
                .user(user)
                .date(request.getDate())
                .status(request.getStatus())
                .build();

        Attendance saved = attendanceRepository.save(attendance);
        return AttendanceResponse.from(saved);
    }

    /**
     * Get attendance records for a specific student.
     */
    public List<AttendanceResponse> getAttendanceByUser(Long userId) {
        // Verify user exists first
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }

        return attendanceRepository.findByUserId(userId)
                .stream()
                .map(AttendanceResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * Get all attendance records (Admin use).
     */
    public List<AttendanceResponse> getAllAttendance() {
        return attendanceRepository.findAll()
                .stream()
                .map(AttendanceResponse::from)
                .collect(Collectors.toList());
    }
}
