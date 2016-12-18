#!/usr/bin/perl

my $c = 0;
while(<>) {
	$c++ if (/[aeiou].*[aeiou].*[aeiou]/ && !/ab/ && !/cd/ && !/pq/ && !/xy/ && /(.)\1/);
}

print $c . "\n";

