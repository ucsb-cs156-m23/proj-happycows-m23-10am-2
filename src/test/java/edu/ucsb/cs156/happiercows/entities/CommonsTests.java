package edu.ucsb.cs156.happiercows.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;

@ExtendWith(SpringExtension.class)
public class CommonsTests {
    LocalDateTime past = LocalDateTime.now().minusDays(30);
    LocalDateTime future = LocalDateTime.now().plusDays(30);
    LocalDateTime distantPast = LocalDateTime.now().minusDays(60);
    LocalDateTime distantFuture = LocalDateTime.now().plusDays(60);

    @MockBean
    CommonsRepository commonsRepository;

    User user = User.builder().id(1L).fullName("Farmer").build();
    UserCommons userCommons = UserCommons.builder().user(user).numOfCows(100).build();
    List<UserCommons> listUserCommons = new ArrayList<UserCommons>(){{
        add(userCommons);
    }};
    Commons commons = Commons.builder().id(31L).capacityPerUser(100).carryingCapacity(50).joinedUsers(listUserCommons).build();

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

    @Test
    void computeEffectiveCapacity_equals_carrying() {
        when(commonsRepository.getNumUsers(31L)).thenReturn(Optional.empty());
        assertEquals(50, Commons.computeEffectiveCapacity(commons, commonsRepository));
    }
}
