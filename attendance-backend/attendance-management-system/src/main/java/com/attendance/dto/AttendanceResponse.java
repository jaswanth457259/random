package com.attendance.dto;

import com.attendance.entity.Attendance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponse {

    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private LocalDate date;
    private Attendance.Status status;

    public static AttendanceResponse from(Attendance attendance) {
        return AttendanceResponse.builder()
                .id(attendance.getId())
                .userId(attendance.getUser().getId())
                .userName(attendance.getUser().getName())
                .userEmail(attendance.getUser().getEmail())
                .date(attendance.getDate())
                .status(attendance.getStatus())
                .build();
    }
}
