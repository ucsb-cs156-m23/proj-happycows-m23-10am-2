package edu.ucsb.cs156.happiercows.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.strategies.CowHealthUpdateStrategies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "commons")
public class Commons {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private double cowPrice;
    private double milkPrice;
    private double startingBalance;
    private LocalDateTime startingDate;
    private LocalDateTime lastdayDate;
    private boolean showLeaderboard;
    private double degradationRate;
    private int carryingCapacity;
    private int capacityPerUser;

    // these defaults match old behavior
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private CowHealthUpdateStrategies belowCapacityHealthUpdateStrategy = CowHealthUpdateStrategies.DEFAULT_BELOW_CAPACITY;
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private CowHealthUpdateStrategies aboveCapacityHealthUpdateStrategy = CowHealthUpdateStrategies.DEFAULT_ABOVE_CAPACITY;

    public boolean gameInProgress() {
        return (startingDate.isBefore(LocalDateTime.now()) && lastdayDate.isAfter(LocalDateTime.now()));
    }

    public static int computeEffectiveCapacity(Commons commons, CommonsRepository commonsRepository) {
        return Math.max(commons.getCapacityPerUser() * commonsRepository.getNumUsers(commons.getId()).orElse(0), commons.getCarryingCapacity());
    }

    @OneToMany(mappedBy = "commons", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<UserCommons> joinedUsers;

}
