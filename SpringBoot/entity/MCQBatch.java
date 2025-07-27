package com.interviewprep.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mcq_batches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MCQBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_session_id", nullable = false)
    private TestSession testSession;

    @CreationTimestamp
    private LocalDateTime createdAt; // Renamed from generatedAt to match requirements

    @OneToMany(mappedBy = "mcqBatch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();
}
