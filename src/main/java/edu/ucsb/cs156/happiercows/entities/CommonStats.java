package edu.ucsb.cs156.happiercows.entities;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "commonstats")

public class CommonStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long commonsId;
    private int numCows;
    private double avgHealth;
    @CreatedDate
    private LocalDateTime timestamp;
}
