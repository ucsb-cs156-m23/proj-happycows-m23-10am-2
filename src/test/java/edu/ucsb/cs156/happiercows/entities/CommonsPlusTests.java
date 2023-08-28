package edu.ucsb.cs156.happiercows.entities;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.Mockito.when;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
public class CommonsPlusTests {

    @MockBean
    CommonsRepository commonsRepository;

    Commons commons = Commons.builder().id(1L).capacityPerUser(100).carryingCapacity(50).build();

    @Test
    void testGetEffectiveCapacity() {
        when(commonsRepository.getNumUsers(1L)).thenReturn(Optional.of(1));
        CommonsPlus commonsPlus = CommonsPlus.builder().commons(commons).commonsRepository(commonsRepository).effectiveCapacity(100).build();
        assertEquals(100, commonsPlus.getEffectiveCapacity());
    }
}