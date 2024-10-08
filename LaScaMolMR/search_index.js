var documenterSearchIndex = {"docs":
[{"location":"index.html#LaScaMolMR","page":"LaScaMolMR","title":"LaScaMolMR","text":"","category":"section"},{"location":"index.html#Overview","page":"LaScaMolMR","title":"Overview","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"LaScaMolMR.jl (Large Scale Molecular Mendelian Randomization) is a threaded Mendelian Randomization (MR) package that is focused on the generation of transcriptome wide / molecular MR analysies. Although it provides an interface for most common MR regression estimators (Inverse Variance Weighted, Weighted Median, Egger, Wald), its intended use is to enable fast Omic-wide Mendelian Randomization studies. The rise of large genetic cohort data has benefited the statistical power of Genome Wide Association Studies (GWAS) and Quantitative Trait Loci (QTL). Thus enabling findings in extensive studies such as Transcriptome Wide MR (TWMR). LaScaMolMR.jl provides a fast and efficient framework to such analyses, allowing users to customize the parameters of the study.","category":"page"},{"location":"index.html#Tutorial","page":"LaScaMolMR","title":"Tutorial","text":"","category":"section"},{"location":"index.html#Example-1-:-Cis-MR","page":"LaScaMolMR","title":"Example 1 : Cis-MR","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"For a QTL dataset composed as follows :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"base/folder\n├── exposureA\n│   ├── exposureA_chr1.txt\n│   └── exposureA_chr2.txt\n├── exposureB\n│   ├── exposureB_chr1.txt\n│   └── exposureB_chr2.txt\n└── exposureC\n    ├── exposureC_chr3.txt\n    └── exposureC_chr4.txt","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"With example data composed like this (tab separated) :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"chr\tpos\teffect_allele\tother_allele\tbeta\tse\tsome_other_column pval\n1\t10511\tA\tG\t-0.176656\t0.136297\t.   0.194939\n1\t10642\tA\tG\t-0.724554\t0.345390\t..  0.035924\n1\t11008\tG\tC\t-0.017786\t0.016673\t... 0.286088\n1\t11012\tG\tC\t-0.017786\t0.016673\t..  0.286088\n1\t13110\tA\tG\t0.013272\t0.021949\t.   0.545411\n1\t13116\tG\tT\t-0.027802\t0.013111\t..  0.0339672\n1\t13118\tG\tA\t-0.027802\t0.013111\t... 0.0339672\n1\t13259\tA\tG\t-0.122207\t0.210776\t..  0.562052\n1\t13273\tC\tG\t0.007077\t0.015337\t.   0.644463","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"and a GWAS of outcome composed similarly but comma separated, the following code will generate a cis-MR study with default parameters :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"using LaScaMolMR","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Describe the exposure data structure (files and columns).","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"path_pattern = [\"exposure\", TRAIT_NAME, \"/exposure\", TRAIT_NAME, \"_chr\", CHR, \".txt\"]\ncolumns = Dict(1 => CHR, 2 => POS, 3 => A_EFFECT, 4 => A_OTHER, 5 => BETA, 6 => SE, 8 => PVAL)\n\ntrait_v = [\"A\", \"B\", \"C\"] # exposure trait identifiers\nchr_v = [1, 2, 3] # chromosome corresponding to exposure protein or gene\ntss_v = [45287, 984276, 485327765] # position of TSS, if relevant\n\nexposure::QTLStudy = QTLStudy_from_pattern(\"base/folder/\", \n                                            path_pattern, \n                                            trait_v, chr_v, tss_v, \n                                            columns, separator = '\\t')","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Describe the outcome data.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"outcome = GWAS(\"/some/file\", columns, separator = ',', trait_name = \"Some Painful Disease\")","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Perform Medelian Randomization study by providing input formats and reference genotype data files.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"# Plink 1.9 files base names for each chromosome (You can also use a single file)\nplink_files = [\"folder/basename_file_chr$(i)\" for i in 1:22]\n\n# Perform MR for every exposure - outcome pairs with default parameters\nout_table = mrStudy(exposure, outcome, \"cis\", plink_files)\n\n# with MiLoP approach to internal pleiotropy and other parameters :\nout_table_MiLoP = mrStudy(exposure, outcome, \"cis\", plink_files, \n                        approach = \"MiLoP\", \n                        r2_tresh = 0.01, \n                        p_tresh = 5e-8,\n                        p_tresh_MiLoP = 5e-4,\n                        pval_bigfolat = true)","category":"page"},{"location":"index.html#Example-2-:-Trans-MR","page":"LaScaMolMR","title":"Example 2 : Trans-MR","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"For a QTL dataset composed as follows :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"base/folder\n├── exposureA.txt\n├── exposureB.txt\n└── exposureC.txt","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"With example data composed like this (tab separated) :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"chr\tpos\tA1\tA2\tbeta\tse\tsome_useless_column pval\n1\t10511\tA\tG\t-0.176656\t0.136297\t.   0.194939\n1\t10642\tA\tG\t-0.724554\t0.345390\t..  0.035924\n1\t11008\tG\tC\t-0.017786\t0.016673\t... 0.286088\n1\t11012\tG\tC\t-0.017786\t0.016673\t..  0.286088\n1\t13110\tA\tG\t0.013272\t0.021949\t.   0.545411\n1\t13116\tG\tT\t-0.027802\t0.013111\t..  0.0339672\n1\t13118\tG\tA\t-0.027802\t0.013111\t... 0.0339672\n1\t13259\tA\tG\t-0.122207\t0.210776\t..  0.562052\n1\t13273\tC\tG\t0.007077\t0.015337\t.   0.644463","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"and a GWAS of outcome composed similarly but comma separated, the following code will generate a trans-MR study with default parameters :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"using LaScaMolMR","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Describe exposure data.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"path_pattern = [\"exposure\", TRAIT_NAME, \".txt\"]\ncolumns = Dict(1 => CHR, 2 => POS, 3 => A_EFFECT, 4 => A_OTHER, 5 => BETA, 6 => SE, 8 => PVAL)\n\ntrait_v = [\"A\", \"B\", \"C\"] # Chromosome and TSS informations are not relevant in Trans setting.\n\nexposure::QTLStudy = QTLStudy_from_pattern(\"base/folder/\", \n                                            path_pattern, \n                                            trait_v, chr_v = nothing, \n                                            tss_v = nothing, \n                                            columns, separator = '\\t', \n                                            only_corresp_chr = false)","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Describe outcome data.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"outcome = GWAS(\"/some/file\", columns, separator = ',', trait_name = \"Some Painful Disease\")","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Perform Medelian Randomization study by providing input formats and reference genotype data files.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"# Plink 1.9 files base names for each chromosome (You can also use a single file)\nplink_files = [\"folder/basename_file_chr$(i)\" for i in 1:22]\n\n# Perform MR for every exposure - outcme pairs with default parameters\nout_table = mrStudy(exposure, outcome, \"trans\", plink_files)\n\n# with MiLoP approach and other parameters :\nout_table2 = mrStudy(exposure, outcome, \"trans\", plink_files, \n                        approach = \"MiLoP\", \n                        r2_tresh = 0.01, \n                        p_tresh = 5e-8,\n                        filter_beta_ratio = 1)\n# Default p_tresh_MiLoP value is the same as p_tresh","category":"page"},{"location":"index.html#MiLoP-approach","page":"LaScaMolMR","title":"MiLoP approach","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Mitigated Local Pleiotropy (MiLoP) approach modifies the potential IV selection process to remove instrument variables associated to more than 1 exposure at p_tresh_MiLoP significance level.","category":"page"},{"location":"index.html#mr_*-regression-functions","page":"LaScaMolMR","title":"mr_* regression functions","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"LaScaMolMR provides four MR regression functions : mr_wald, mr_ivw, mr_egger and mr_wm performing respectively the wald ratio of the first provided instrument, Inverse Variance Weighted, Egger and Weighted Median regressions.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Example :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"out = mr_wm(beta_outcome, se_outcome, beta_exposure, se_exposure;\n            iteration = 10000, seed = 42, α = 0.05)","category":"page"},{"location":"index.html#mr_output-as-a-standard-output-for-mr_*-:","page":"LaScaMolMR","title":"mr_output as a standard output for mr_* :","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"The mroutput struct provies a standard interface to functions performing mendelian randomization. This allows for user to use its own MR functions for mrStudy. Any function receiving 4 vectors, having at least alpha as an option and outputing a `mroutput` is valid.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Here is the definitioin of mr_output :","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"struct mr_output\n    nivs::Int\n    effect::Float64\n    se_effect::Float64\n    ci_low::Float64\n    ci_high::Float64\n    p::Float64\n    intercept::Float64\n    p_intercept::Float64\n    ci_low_intercept::Float64\n    ci_high_intercept::Float64\n    heter_stat::Float64\n    heter_p::Float64\nend","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Any function following this format could be provided to ClumpAndMR/mrStudy in the mr_methods option, including user-defined functions.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"function mr_something(beta_outcome, se_outcome, beta_exposure, se_exposure; \n                      α = 0.05, other_params = default_value\n                     )::mr_output\n\n    # Calculate values\n    ...\n    # end\n\n    # Not calculated values can be replaced by NaN\n    return mr_ouput(nivs, effect, ci_low, ci_high, p, NaN, NaN, NaN, NaN, heter_stat, heter_p)\n\nend\n\noutput = NaiveCis(data, genotypes; mr_methods = [mr_ivw, mr_something])","category":"page"},{"location":"index.html#API","page":"LaScaMolMR","title":"API","text":"","category":"section"},{"location":"index.html#Index","page":"LaScaMolMR","title":"Index","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"","category":"page"},{"location":"index.html#Provide-inputs","page":"LaScaMolMR","title":"Provide inputs","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"These functions allow users to specify the input formats. The QTL summary statistics can be united in a single file or divided by exposure, chromosome or both.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"For the sake of simplicity, we consider a genetic association study as a GWAS when a single phenotype was studied and as a QTLStudy otherwise.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"GenVarInfo\n\nGWAS\n\nQTLStudy\n\nQTLStudy_from_pattern","category":"page"},{"location":"index.html#LaScaMolMR.GenVarInfo","page":"LaScaMolMR","title":"LaScaMolMR.GenVarInfo","text":"Enum of different information present in qtl file path or inside QTL/GWAS text delimited files.\n\nvalues :\n\nTRAIT_NAME  # Name of the trait (e.g. QTL protein name)\nCHR         # chromosome\nPOS         # position in chromosome\nA_EFFECT    # effect allele of SNP\nA_OTHER     # reference allele of SNP\nBETA        # effect size of SNP\nSE          # standard error of effect size\nPVAL        # Pvalue for H₀ : BETA = 0\n\n\n\n\n\n","category":"type"},{"location":"index.html#LaScaMolMR.GWAS","page":"LaScaMolMR","title":"LaScaMolMR.GWAS","text":"Type GWAS which contains informations about GWAS file\n\npath        # path to file\ncolumns     # Dictionary of column number => GenVarInfo type of info at column\nseparator   # column separator\ntrait_name  # name of the trait (nothing if not specified)\n\nExample\n\ngwas = GWAS(\"path/to/file\", \n            Dict(1 => PVAL, 2 => CHR, 3 => POS, 8 => BETA, 9 => SE),\n            ',')\n\n\n\n\n\n","category":"type"},{"location":"index.html#LaScaMolMR.QTLStudy","page":"LaScaMolMR","title":"LaScaMolMR.QTLStudy","text":"Type QTLStudy which contains informations about QTL file(s) format and implacement.\n\nThe method QTLStudy_from_pattern helps building information from patterns in file names and is the prefered methods to construct a QTLStudy.\n\nfields :\n\npath_v                  # vector of file names (path)\ntraits_for_each_path    # Trait corrpespondinf to each path (nothing if files are not trait specific)\ntrait_v                 # names of all traits included\nchr_v                   # chromosomes corresponding to each trait (nothing if not relevant)\ntss_v                   # tss position corresponding to each trait (nothing if not relevant)\ncolumns                 # Dictionary of column number => GenVarInfo type of info at column\nseparator               # column separator\n\n\n\n\n\n","category":"type"},{"location":"index.html#LaScaMolMR.QTLStudy_from_pattern","page":"LaScaMolMR","title":"LaScaMolMR.QTLStudy_from_pattern","text":"Make QTLStudy which contains informations about QTL file(s) format and implacement from some file pattern\n\narguments :\n\nfolder is the main folder cntaining all QTL files. \npath_pattern is a vector of strngs and GenVarInfo characterizing the pattern of every file name in the folder. \ntrait_v is an collection of traits that should be incuded in future analysis. \nchr_v is a vector of each chromosome of each QTL trait. \ntss_v is a vector of every Transcription start site. \ncolumns is a dictionary of all informations contained in columns of QTL files. \nseparator is the separator of QTL files. \nonly_corresp_chr indicates if only variants on chromosome correspoding to QTL trait should be kept. Default is true.      Set to false for Trans MR studies.\n\nTIP : if your file contains a chromosome:position column (e.g. 1:324765), consider setting your separator to [':', sep]\n\nExamples\n\nfor a sigle file QTL :\n\nQTLStudy_from_pattern(\"some/folder\", [\"qtl.txt\"], tv, cv, tssv,\n                      Dict(1 => CHR, 2 => POS, 8 => PVAL, ...),\n                      separator = ' ',\n                      only_corresp_chr = true)\n\nfor this arhitecture (in UNIX) :\n\ntest/data\n├── exposureA\n│   ├── exposureA_chr1.txt\n│   └── exposureA_chr2.txt\n├── exposureB\n│   ├── exposureB_chr1.txt\n│   └── exposureB_chr2.txt\n└── exposureC\n    ├── exposureC_chr3.txt\n    └── exposureC_chr4.txt\n\nwe get this code :\n\npath_pattern = [\"exposure\", TRAIT_NAME, \"/exposure\", TRAIT_NAME, \"_chr\", CHR, \".txt\"]\ntrait_v = [\"A\", \"B\", \"C\"]\nchr_v = [1, 2, 3]\ntss_v = [45287, 984276, 485327765]\n\nqtl = QTLStudy_from_pattern(\"test/data\", path_pattern, ttrait_v, chr_v, tss_v,\n                            Dict(1 => CHR, 2 => POS, 8 => PVAL, ...),\n                            separator = ' ',\n                            only_corresp_chr = true)\n\n\n\n\n\n","category":"function"},{"location":"index.html#Perform-a-MR-Study","page":"LaScaMolMR","title":"Perform a MR Study","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"The function mrStudy allows the users to perform meta-analysis over many pairs of traits given the input format. The function has three implementations depending on the type of studies used as exposure and outcomes. (GWAS -> GWAS, QTL -> GWAS, GWAS -> QTL)","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"mrStudy\n\nmrStudyNFolds","category":"page"},{"location":"index.html#LaScaMolMR.mrStudy","page":"LaScaMolMR","title":"LaScaMolMR.mrStudy","text":"Perform a Mendelian Randomization study with exposure QTL and outcome GWAS\n\narguments :\n\nexposure::QTLStudy : exposure QTL data \noutcome::GWAS : outcome gas data \ntype::AbstractString : specifies if the analysis is a trans or cis MR analysis (is either \"trans\" or \"cis\")\nbedbimfam_dirnames::AbstractArray{<:AbstractString} : base names of Plink bedbimfam files for reference genotypes      (see SnpArrays documentation)\n options :\n approach::String: name of MR study aproach chosen (either naive, test or MiLoP) (default is \"naive\")\np_tresh::Float64: pvalue threshold for a SNP to be considered associated to an exposure (default is 1e-3)\nwindow::Integer: maximal distance between a potential Instrument Variable and transciption start site of gene exposure (default is 500000)\n`r2tresh::Float64`: maximial corrlation between to SNPs (default is 0.1)\nexposure_filtered::Bool : If true, the exposure files are considered already filtered will not filtered      on distance to tss and level of significance (default is false)\nmr_methods::AbstractVector{Function} : Functions to use to estimate effect of exposure on outcome.     Any Function taking four vectors of same length (βoutcome, seoutcome, βexposure, seexposure) and a Float (α)      and returns a value of type mr_output can be used, that includes user defined functions.      Functions already implemented in this module include mr_ivw, mr_egger, mr_wm and mr_wald. default value is [mr_ivw, mr_egger] \nα::Float64 : α value for confidance intervals of parameter estimations in MR (e.g. 95% CI is α = 0.05, which is the default value)\ntrsf_pval_exp::Union{Function, Nothing} : Transformation to apply to pvalues in exposure dataset\ntrsf_pval_out::Union{Function, Nothing} : t = Transormation to apply on pvalues in outcome dataset\nlow_ram::Bool : If true, if the exposure files each contain only one exposure trait, mrStudyNFolds with n_folds of 10 will be used.\nwrite_ivs::AbstractString : write selected Instrumental variables to specified directory\nwrite_filtered_exposure::AbstractString : write a filtered version of exposure files to specified file name.     This file will be tab separated and will only contain columns necessary for further MR Studies.\nfilter_beta_raio::Real : Filter IVs for which the exposure effect is filter_beta_raio times outcome effect or greater. default is 0.\npval_bigfloat::Bool : use true if pvalues can be under 5e-324. (default is false)\nmin_maf::Real : minimal variant maf to be kept as a potential IV. (default is 0)\ninfos::Bool : If true, infos about advancement compute are printed to terminal (default is true)\n\nExamples\n\nresults = mrStudy(qtl, gwas, \"trans\", genotypes, 10, approach = \"naive\", window = 250000, trsf_pval_exp = x -> exp10.(x))\n\n\n\n\n\nPerform a Trans-Mendelian Randomization study with exposure GWAS and outcome GWAS\n\narguments :\n\nexposure::GWAS : exposure QTL data \noutcome::GWAS : outcome GWAS data \nbedbimfam_dirnames::AbstractArray{<:AbstractString} : base names of Plink bedbimfam files for reference genotypes      (see SnpArrays documentation)\n options : \n approach::String: name of MR study aproach chosen (either naive, test or MiLoP) (default is \"naive\")\np_tresh::Float64: pvalue threshold for a SNP to be considered associated to an exposure (default is 1e-3)\nr2_tresh::Float64: maximial corrlation between to SNPs (default is 0.1)\nexposure_filtered::Bool : If true, the exposure files are considered already filtered will not filtered      on distance to tss and level of significance (default is false)\nmr_methods::AbstractVector{Function} : Functions to use to estimate effect of exposure on outcome.     Any Function taking four vectors of same length (βoutcome, seoutcome, βexposure, seexposure) and a Float (α)      and returns a value of type mr_output can be used, that includes user defined functions.      Functions already implemented in this module include mr_ivw, mr_egger, mr_wm and mr_wald. default value is [mr_ivw, mr_egger] \nα::Float64 : α value for confidance intervals of parameter estimations in MR (e.g. 95% CI is α = 0.05, which is the default value)\ntrsf_pval_exp::Union{Function, Nothing} : Transformation to apply to pvalues in exposure dataset\ntrsf_pval_out::Union{Function, Nothing} : t = Transormation to apply on pvalues in outcome dataset\nlow_ram::Bool : If true, if the exposure files each contain only one exposure trait, mrStudyNFolds with n_folds of 10 will be used. write_ivs::AbstractString : write selected Instrumental variables to specified directory\nwrite_filtered_exposure::AbstractString : write a filtered version of exposure files to specified file name.     This file will be tab separated and will only contain columns necessary for further MR Studies.\npval_bigfloat::Bool : use true if pvalues can be under 5e-324. (default is false)\nfilter_beta_raio::Real : Filter IVs for which the exposure effect is filter_beta_raio times outcome effect or greater. default is 0.\ninfos::Bool : If true, infos about advancement compute are printed to terminal (default is true)\n\nExamples\n\nresults = mrStudy(gwas1, gwas2, genotypes, 10, approach = \"naive\", trsf_pval_exp = x -> exp10.(x))\n\n\n\n\n\nPerform a Trans-Mendelian Randomization study with exposure GWAS and outcome QTL\n\narguments :\n\nexposure::GWAS : exposure GWAS data \noutcome::QTLStudy : outcome QTL data \nbedbimfam_dirnames::AbstractArray{<:AbstractString} : base names of Plink bedbimfam files for reference genotypes      (see SnpArrays documentation)\n options : \n\napproach::String: name of MR study aproach chosen (either naive, test or MiLoP) (default is \"naive\")\np_tresh::Float64: pvalue threshold for a SNP to be considered associated to an exposure (default is 1e-3)\nr2_tresh::Float64: maximial corrlation between to SNPs (default is 0.1)\nmr_methods::AbstractVector{Function} : Functions to use to estimate effect of exposure on outcome.     Any Function taking four vectors of same length (βoutcome, seoutcome, βexposure, seexposure) and a Float (α)      and returns a value of type mr_output can be used, that includes user defined functions.      Functions already implemented in this module include mr_ivw, mr_egger, mr_wm and mr_wald. default value is [mr_ivw, mr_egger] \nα::Float64 : α value for confidance intervals of parameter estimations in MR (e.g. 95% CI is α = 0.05, which is the default value)\ntrsf_pval_exp::Union{Function, Nothing} : Transformation to apply to pvalues in exposure dataset\ntrsf_pval_out::Union{Function, Nothing} : t = Transormation to apply on pvalues in outcome dataset\nlow_ram::Bool : If true, if the exposure files each contain only one exposure trait, mrStudyNFolds with n_folds of 10 will be used. write_ivs::AbstractString : write selected Instrumental variables to specified directory\npval_bigfloat::Bool : use true if pvalues can be under 5e-324. (default is false)\nfilter_beta_raio::Real : Filter IVs for which the exposure effect is filter_beta_raio times outcome effect or greater. default is 0.\ninfos::Bool : If true, infos about advancement compute are printed to terminal (default is true)\n\n\n\n\n\n","category":"function"},{"location":"index.html#LaScaMolMR.mrStudyNFolds","page":"LaScaMolMR","title":"LaScaMolMR.mrStudyNFolds","text":"Perform Mendelian Randomization study from QTL to GWAS and separating exposure in n folds to avoid loading full dataset in memory.      (works if separated in multiple files only)\n\narguments :\n\nexposure::QTLStudy : exposure QTL data \noutcome::GWAS : outcome GWAS data \ntype::AbstractString : specifies if the analysis is a trans or cis MR analysis (is either \"trans\" or \"cis\")\nbedbimfam_dirnames::AbstractArray{<:AbstractString} : base names of Plink bedbimfam files for reference genotypes      (see SnpArrays documentation)\n\n\noptions :\n\nmrStudyNFolds contains the same options as mrStudy\nn_folds::Integer : Number f folds to separate QTl into.\n\nsee mrStudy for other options and examples.\n\n\n\n\n\nPerform Mendelian Randomization study from GWAS to QTL and separating outcome in n folds to avoid loading full dataset in memory.      (works if separated in multiple files only)\n\narguments :\n\nexposure::GWAS : exposure GWAS data \noutcome::QTLStudy : outcome QTL data \nbedbimfam_dirnames::AbstractArray{<:AbstractString} : base names of Plink bedbimfam files for reference genotypes      (see SnpArrays documentation)\n\n\noptions :\n\nmrStudyNFolds contains the same options as mrStudy\nn_folds::Integer : Number f folds to separate QTl into.\n\nsee mrStudy for other options and examples.\n\n\n\n\n\n","category":"function"},{"location":"index.html#Linkage-Desiquilibrium-and-MR","page":"LaScaMolMR","title":"Linkage Desiquilibrium and MR","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"The ClumpAndMR function performs clumping over every pair of (exposure, outcome) and calls Mendelian randomization fonctions. You can thus use it if potential IV selection was already performed.","category":"page"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"ClumpAndMR","category":"page"},{"location":"index.html#LaScaMolMR.ClumpAndMR","page":"LaScaMolMR","title":"LaScaMolMR.ClumpAndMR","text":"Keep independant IVs and perform MR in Omic-wide MR (Trans or Cis)     Returns a Dataset of results for each exposure (rows).\n\narguments : \n\ndata : grouped dataset (exposure trait) with specific column names :      :trait, :chr, :pos, :β_exp, β_out, :se_exp, :se_out among others. \nGenotypesArr::AbstractVector{SnpData} : Reference genotypes. (see SnpArrays) formated with formatSnpData!.\n\noptions :\n\none_file_per_chr_plink::Bool : If true, it is considered that the each index in GenotypesArr corresponds to a chromosome number (default is true) \nr2_tresh::AbstractFloat : The maximal r² correlation coefficient for two snps to be considered independant. (default is 0.1) \nmr_methods::AbstractVector{Function}: Functions to use to estimate effect of exposure on outcome.     Any Function taking four vectors of same length (βoutcome, seoutcome, βexposure, seexposure) and a Float (α)      and returns a value of type mr_output can be used, that includes user defined functions.      Functions already implemented in this module include mr_ivw, mr_egger, mr_wm     and mr_wald. default value is [mr_ivw, mr_egger] \nα:AbstractFloat : α value for confidance intervals of parameter estimations in MR (e.g. 95% CI is α = 0.05, which is the default value)\nwrite_ivs::AbstractString : write selected Instrumental variables to specified directory\n\nExamples :\n\nres_d = ClumpAndMR(d, GenotypesArr, r2_tresh = 0.1)\n\n\n\n\n\n","category":"function"},{"location":"index.html#Mendelian-Randomization-functions","page":"LaScaMolMR","title":"Mendelian Randomization functions","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"mr_output\n\nmr_wald\n\nmr_ivw\n\nmr_egger\n\nmr_wm","category":"page"},{"location":"index.html#LaScaMolMR.mr_output","page":"LaScaMolMR","title":"LaScaMolMR.mr_output","text":"Struct encapsulating the outputs of a Mendelian Randomization analysis\n\nfields :\n\nnivs : number of ivs included in regression \neffect : effect size estimate ̂γ₀ \nse_effect : standard error of effect size estimate \nci_low : lower bound of confidence interval for effect size \nci_high : higher bound of confidence interval for effect size \np : effect size p-value for H₀ : γ₀ = 0 \nintercept : intercept estimate ̂γ₁ \np_intercept : p-value for H₀ : γ₁ = 0 \nci_low_intercept : lower bound of confidence interval for intercept \nci_high_intercept : higher bound of confidence interval for intercept \nheter_stat : heterogenetity statistic corresponding to Cochran ̂t \nheter_p : heterogeneity p-value for H₀ : t = 0\n\n\n\n\n\n","category":"type"},{"location":"index.html#LaScaMolMR.mr_wald","page":"LaScaMolMR","title":"LaScaMolMR.mr_wald","text":"Wald ratio for Mendelian Randomization with a single instrumental variable      y is outcome, x is exposure\n\narguments :\n\nβ_Y : outcome effect sizes\n\nse_β_Y : standard error of outcome effect size\n\nβ_X : exposure effect size\n\nα : α value for confidence intervals (default is 0.05)\n\n\n\n\n\nWald ratio for Mendelian Randomization with a single instrumental variable      y is outcome, x is exposure\n\narguments :\n\nβ_Y : vector of outcome effect sizes\n\nse_β_Y : vector of standard error of outcome effect sizes\n\nβ_X : vector of exposure effect sizes\n\nse_β_X : vector of standard error for exposure effect sizes\n\nα : α value for confidence intervals (default is 0.05)\n\n\n\n\n\n","category":"function"},{"location":"index.html#LaScaMolMR.mr_ivw","page":"LaScaMolMR","title":"LaScaMolMR.mr_ivw","text":"Inverse variance weighted linear regression with simple weights (se(B_Y)^-2) Mendelian Randomization     Y is outcome, X is exposure\n\ncurrently waiting for GLM.jl PR#487 to be merged to use analytical weights instead of doing calculations twice...\n\narguments :\n\nβ_Y : vector of outcome effect sizes\n\nse_β_Y : vector of standard error of outcome effect sizes\n\nβ_X : vector of exposure effect sizes\n\nse_β_X : vector of standard error for exposure effect sizes\n\nα : α value for confidence intervals (default is 0.05)\n\noptions :\n\nmodel::Symbol : :random, :fixed or :default effect type. :default is fixed if less than 4 ivs, random otherwise.\n\n\n\n\n\n","category":"function"},{"location":"index.html#LaScaMolMR.mr_egger","page":"LaScaMolMR","title":"LaScaMolMR.mr_egger","text":"Egger Mendelian Randomization     Y is outcome, X is exposure\n\ncurrently waiting for GLM.jl PR#487 to be merged to use analytical weights instead of doing calculations twice...\n\narguments :\n\nβ_Y : vector of outcome effect sizes\n\nse_β_Y : vector of standard error of outcome effect sizes\n\nβ_X : vector of exposure effect sizes\n\nse_β_X : vector of standard error for exposure effect sizes\n\nα : α value for confidence intervals (default is 0.05)\n\n\n\n\n\n","category":"function"},{"location":"index.html#LaScaMolMR.mr_wm","page":"LaScaMolMR","title":"LaScaMolMR.mr_wm","text":"Weighted Median Mendelian Randomization (Bowden et al., 2015)     Y is outcome, X is exposure.\n\narguments :\n\nβ_Y : vector of outcome effect sizes\n\nse_β_Y : vector of standard error of outcome effect sizes\n\nβ_X : vector of exposure effect sizes\n\nse_β_X : vector of standard error for exposure effect sizes\n\nα : α value for confidence intervals (default is 0.05)\n\noptions :\n\niterations : number of iterations for estimate of standrard error or effect size. seed : seed of random generator\n\n\n\n\n\n","category":"function"},{"location":"index.html#Exported-Utilities","page":"LaScaMolMR","title":"Exported Utilities","text":"","category":"section"},{"location":"index.html#Inputs","page":"LaScaMolMR","title":"Inputs","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"nfolds","category":"page"},{"location":"index.html#LaScaMolMR.nfolds","page":"LaScaMolMR","title":"LaScaMolMR.nfolds","text":"Partitionate QTLStudy in n folds. Returns a vector of QTLStudy in which each element contains a subsets of file paths and corresponding traits. \n\narguments :\n\nx::QTLStudy : the qtl files and informations (see QTLStudy) \nm::Integer : the number of folds\n\n\n\n\n\n","category":"function"},{"location":"index.html#LD","page":"LaScaMolMR","title":"LD","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"formatSnpData!\n\nclump","category":"page"},{"location":"index.html#LaScaMolMR.formatSnpData!","page":"LaScaMolMR","title":"LaScaMolMR.formatSnpData!","text":"format Genotype information contained in SnpData for optimised snp search based on chromosome position. Adds a column of tuple (chr::Int8, pos::Int) in snpinfo and sorts snpinfo accordingly.     returns nothing\n\nExamples\n\nref = SnpData(datadir(\"some/data\"))\n\nformatSnpData!(ref)\n\nNote this function does not take into account the user might want to write SnpData in bed, bim, fam format.      The changes done by this function can and will cause problems if writing plink files after calling formatSnpData!.\n\n\n\n\n\n","category":"function"},{"location":"index.html#LaScaMolMR.clump","page":"LaScaMolMR","title":"LaScaMolMR.clump","text":"threaded implementation of the clumping algorithm prioritising first snps in given Vector and formated Genotypes SnpData (see formatSnpData!)     returns a vector of boolean indicating if each given snp is kept\n\narguments :\n\nref_genotypes : reference SnpData (SnpArrays) \nsnps : vector of chromosome position tuple for each variant\n\noptions : \n\nformated : indicates if ref SnpData is already formated according to :chrpos (chr, pos)\n`r2tresh` : minimal r² for 2 snps to be considered strongly correlated.\n\nExamples :\n\njulia> ref = SnpData(datadir(\"some/data\"));\n\njulia> kept_v_b::Vector{Bool} = clump([(1, 123), (1, 456), (1, 789)], ref)\n3-element Vector{Int64}:\n 1\n 0\n 1\n\njulia> formatSnpData!(ref);\n\njulia> kept_v_b::Vector{Bool} = clump([(1, 123), (1, 456), (1, 789)], ref, formated = true)\n3-element Vector{Int64}:\n 1\n 0\n 1\n\nIf formatSnpData has already been called on good snp info type (:chr_pos or :snpid), formated = true option does not verify or modify formating. See formatSnpData!.\n\n\n\n\n\n","category":"function"},{"location":"index.html#Contents","page":"LaScaMolMR","title":"Contents","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"","category":"page"},{"location":"index.html#Authors","page":"LaScaMolMR","title":"Authors","text":"","category":"section"},{"location":"index.html","page":"LaScaMolMR","title":"LaScaMolMR","text":"Samuel Mathieu, Hippolyte Minvielle Moncla, Mewen Briend, Valentine Duclos, Anne Rufiange, Patrick Mathieu","category":"page"}]
}
