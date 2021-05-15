package vn.edu.hnue.toiec.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.hnue.toiec.data.entities.Part;

import java.util.List;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {

    Part findTopByNumberPart(String numberPart);

    @Query("select new Part (p.numberPart) from Part p group by p.numberPart order by p.numberPart asc")
    List<Part> findAllByNumberPart();

    @Query("select new Part (p.numberPart) from Part p where p.numberPart LIKE '1%' order by p.numberPart asc ")
    List<Part> findAllNumberPartOne();

    @Query("select new Part (p.numberPart) from Part p where p.numberPart LIKE '2%' order by p.numberPart asc ")
    List<Part> findAllNumberPartTwo();

    @Query("select new Part (p.numberPart) from Part p where p.numberPart LIKE '3%' order by p.numberPart asc ")
    List<Part> findAllNumberPartThree();

    @Query("select new Part (p.numberPart) from Part p where p.numberPart LIKE '4%' order by p.numberPart asc ")
    List<Part> findAllNumberPartFour();

    @Query("select new Part (p.numberPart) from Part p where p.numberPart LIKE '5%' order by p.numberPart asc ")
    List<Part> findAllNumberPartFive();

    @Query("select new Part (p.numberPart) from Part p where p.numberPart LIKE '6%' order by p.numberPart asc ")
    List<Part> findAllNumberPartSix();

    @Query("select new Part (p.numberPart) from Part p where p.numberPart LIKE '7%' order by p.numberPart asc ")
    List<Part> findAllNumberPartSeven();

    Boolean existsByNumberPart(String numberPart);
}
