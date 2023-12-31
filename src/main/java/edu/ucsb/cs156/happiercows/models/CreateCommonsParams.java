package edu.ucsb.cs156.happiercows.models;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class CreateCommonsParams {
    private String name;
    @NumberFormat
    private double cowPrice;
    @NumberFormat
    private double milkPrice;
    @NumberFormat
    private double startingBalance;
    @DateTimeFormat
    private LocalDateTime startingDate;
    @DateTimeFormat
    private LocalDateTime lastdayDate;
    @Builder.Default
    private Boolean showLeaderboard = false;
    @NumberFormat
    private int carryingCapacity;
    @NumberFormat
    private double degradationRate;
    @NumberFormat
    private int capacityPerUser;

    private String aboveCapacityHealthUpdateStrategy;
    private String belowCapacityHealthUpdateStrategy;
}
