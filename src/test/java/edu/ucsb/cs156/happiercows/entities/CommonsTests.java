package edu.ucsb.cs156.happiercows.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

public class CommonsTests {
    LocalDateTime past = LocalDateTime.now().minusDays(30);
    LocalDateTime future = LocalDateTime.now().plusDays(30);
    LocalDateTime distantPast = LocalDateTime.now().minusDays(60);
    LocalDateTime distantFuture = LocalDateTime.now().plusDays(60);

    @Test
    void gameInProgress_during_True() throws Exception {
        assertEquals(true, Commons.builder().startingDate(past).lastdayDate(future).build().gameInProgress());
    }

    @Test
    void gameInProgress_over_False() throws Exception {
        assertEquals(false, Commons.builder().startingDate(distantPast).lastdayDate(past).build().gameInProgress());
    }

    @Test
    void gameInProgress_before_False() throws Exception {
        assertEquals(false, Commons.builder().startingDate(future).lastdayDate(distantFuture).build().gameInProgress());
    }
}
