package edu.ucsb.cs156.happiercows.strategies;

import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
class CowHealthUpdateStrategyTests {

    @Mock
    CommonsRepository commonsRepository;

    @Test
    void get_name_and_description() {
        assertEquals("Linear", CowHealthUpdateStrategies.Linear.name());
        assertEquals("Linear", CowHealthUpdateStrategies.Linear.getDisplayName());
        assertEquals("Cow health increases/decreases proportionally to the number of cows over/under the carrying capacity.", CowHealthUpdateStrategies.Linear.getDescription());
    }


    Commons commons = Commons.builder()
            .id(1L)
            .degradationRate(0.01)
            .carryingCapacity(100)
            .build();
    UserCommons user = UserCommons.builder().cowHealth(50).build();



    @Test
    void linear_updates_health_proportional_to_num_cows_over_capacity() {
        var formula = CowHealthUpdateStrategies.Linear;

        when(commonsRepository.getNumUsers(1L)).thenReturn(Optional.of(1));

        assertEquals(49.9, formula.calculateNewCowHealth(commons, commonsRepository, user, 110));
        assertEquals(50.0, formula.calculateNewCowHealth(commons, commonsRepository, user, 100));
        assertEquals(50.1, formula.calculateNewCowHealth(commons, commonsRepository, user, 90));
    }

    @Test
    void constant_changes_by_constant_amount() {
        var formula = CowHealthUpdateStrategies.Constant;

        when(commonsRepository.getNumUsers(1L)).thenReturn(Optional.of(1));

        assertEquals(49.99, formula.calculateNewCowHealth(commons, commonsRepository, user, 120));
        assertEquals(49.99, formula.calculateNewCowHealth(commons, commonsRepository, user, 110));
        assertEquals(50.01, formula.calculateNewCowHealth(commons, commonsRepository, user, 100));
        assertEquals(50.01, formula.calculateNewCowHealth(commons, commonsRepository, user, 90));
    }

    @Test
    void noop_does_nothing() {
        var formula = CowHealthUpdateStrategies.Noop;

        when(commonsRepository.getNumUsers(1L)).thenReturn(Optional.of(1));

        assertEquals(50.0, formula.calculateNewCowHealth(commons, commonsRepository, user, 110));
        assertEquals(50.0, formula.calculateNewCowHealth(commons, commonsRepository, user, 100));
        assertEquals(50.0, formula.calculateNewCowHealth(commons, commonsRepository, user, 90));
    }
}
