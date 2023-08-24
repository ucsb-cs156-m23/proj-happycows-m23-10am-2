package edu.ucsb.cs156.happiercows.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.ProfitRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;

@RestClientTest(MilkTheCowsJobFactorySingleCommons.class)

public class MilkTheCowsJobSingleCommonsFactoryTests {
    @MockBean
    CommonsRepository commonsRepository;

    @MockBean
    UserCommonsRepository userCommonsRepository;

    @MockBean
    UserRepository userRepository;

    @MockBean
    ProfitRepository profitRepository;

    @Autowired
    MilkTheCowsJobFactorySingleCommons MilkTheCowsJobFactorySingleCommons;

    @Test
    void test_create() throws Exception {

        // Act
        MilkTheCowsJobSingleCommons milkTheCowsJobSingleCommons = (MilkTheCowsJobSingleCommons) MilkTheCowsJobFactorySingleCommons.create();

        // Assert
        assertEquals(commonsRepository,milkTheCowsJobSingleCommons.getCommonsRepository());
        assertEquals(userCommonsRepository,milkTheCowsJobSingleCommons.getUserCommonsRepository());
        assertEquals(userRepository,milkTheCowsJobSingleCommons.getUserRepository());
        assertEquals(profitRepository,milkTheCowsJobSingleCommons.getProfitRepository());

    }
}
