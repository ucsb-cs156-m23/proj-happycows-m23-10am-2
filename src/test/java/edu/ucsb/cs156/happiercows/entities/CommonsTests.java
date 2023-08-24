package edu.ucsb.cs156.happiercows.entities;

import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

public class CommonsTests {
    LocalDateTime past = LocalDateTime.now().minusDays(30);
    LocalDateTime future = LocalDateTime.now().plusDays(30);
    LocalDateTime distantPast = LocalDateTime.now().minusDays(60);
    LocalDateTime distantFuture = LocalDateTime.now().plusDays(60);

    @Test
    void gameInProgress_during_True() {
        Commons commons = Commons.builder().startingDate(past).lastdayDate(future).build();
        assert (commons.gameInProgress());
    }

    @Test
    void gameInProgress_over_False() {
        Commons commons = Commons.builder().startingDate(distantPast).lastdayDate(past).build();
        assert (!commons.gameInProgress());
    }

    @Test
    void gameInProgress_before_False() {
        Commons commons = Commons.builder().startingDate(future).lastdayDate(distantFuture).build();
        assert (!commons.gameInProgress());
    }
}
