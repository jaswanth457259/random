package com.attendance.dto;

import com.attendance.entity.Attendance;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Status is required (PRESENT or ABSENT)")
    private Attendance.Status status;
}
