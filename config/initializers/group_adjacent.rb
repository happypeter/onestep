module Enumerable
  # clumps adjacent elements together
  # >> [2,2,2,3,3,4,2,2,1].cluster{|x| x}
  # => [[2, 2, 2], [3, 3], [4], [2, 2], [1]]
  def cluster
    cluster = []
    each do |element|
      if cluster.last && yield(cluster.last.last) == yield(element)
        cluster.last << element
      else
        cluster << [element]
      end
    end
    cluster
  end
end
