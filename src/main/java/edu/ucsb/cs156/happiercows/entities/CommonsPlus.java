package edu.ucsb.cs156.happiercows.entities;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonGetter;

import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommonsPlus {
    private Commons commons;
    private CommonsRepository commonsRepository;
    private Integer totalCows;
    private Integer totalUsers;
    private Integer effectiveCapacity;
}